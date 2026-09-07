import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/data';

// PayPal API credentials
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

const FREE_SHIPPING_THRESHOLD = 79;
const SHIPPING_FEE_UNDER = 5.99;

async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items: rawItems, shippingAddress } = body;

    if (!rawItems || rawItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Never trust client-supplied prices: look up the authoritative price for
    // each item server-side by slug so a tampered request can't check out at
    // an arbitrary amount.
    const priceBySlug = new Map(products.map((p) => [p.slug, p.price]));
    const items: { name: string; price: number; quantity: number; slug?: string }[] = [];
    for (const raw of rawItems as { name?: string; quantity: number; slug?: string }[]) {
      const realPrice = raw.slug ? priceBySlug.get(raw.slug) : undefined;
      if (realPrice === undefined) {
        return NextResponse.json({ error: `Unknown product: ${raw.slug || raw.name}` }, { status: 400 });
      }
      const quantity = Math.max(1, Math.min(99, Math.floor(Number(raw.quantity) || 1)));
      items.push({ name: raw.name || raw.slug!, price: realPrice, quantity, slug: raw.slug });
    }

    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0,
    );
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE_UNDER;
    const total = subtotal + shipping;

    const accessToken = await getAccessToken();

    const paypalOrder = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: subtotal.toFixed(2),
                },
                shipping: {
                  currency_code: 'USD',
                  value: shipping.toFixed(2),
                },
              },
            },
            items: items.map((item: { name: string; price: number; quantity: number }) => ({
              name: item.name,
              unit_amount: {
                currency_code: 'USD',
                value: item.price.toFixed(2),
              },
              quantity: item.quantity.toString(),
            })),
            shipping: shippingAddress
              ? {
                  name: { full_name: shippingAddress.name },
                  address: {
                    address_line_1: shippingAddress.address,
                    admin_area_2: shippingAddress.city,
                    admin_area_1: shippingAddress.state,
                    postal_code: shippingAddress.postalCode,
                    country_code: shippingAddress.country || 'US',
                  },
                }
              : undefined,
          },
        ],
        application_context: {
          brand_name: 'FreshLock',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.freshlocksealer.com'}/checkout/success?payment_method=paypal`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.freshlocksealer.com'}/checkout`,
        },
      }),
    });

    const orderData = await paypalOrder.json();
    const approveLink = orderData.links?.find((link: { rel: string }) => link.rel === 'approve');

    if (!approveLink) {
      console.error('PayPal order response:', JSON.stringify(orderData));
      throw new Error('Could not get PayPal approval URL');
    }

    return NextResponse.json({ orderId: orderData.id, approvalUrl: approveLink.href });
  } catch (error) {
    console.error('PayPal order creation error:', error);
    return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }
    const accessToken = await getAccessToken();
    const captureResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const captureData = await captureResponse.json();
    if (captureData.status === 'COMPLETED') {
      return NextResponse.json({ success: true, orderId: captureData.id, status: captureData.status });
    }
    throw new Error('Payment not completed');
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.json({ error: 'Failed to capture payment' }, { status: 500 });
  }
}
