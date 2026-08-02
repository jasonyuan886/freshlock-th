import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/smtp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.zoho.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'support@freshlocksealer.com';
const SMTP_PASS = process.env.SMTP_PASS;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'support@freshlocksealer.com';
const FROM_EMAIL_NAME = 'FreshLock Checkout';
const FROM_EMAIL_ADDRESS = SMTP_USER;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    if (!SMTP_PASS) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const email: string = (body.email || '').toString().trim();
    const action: string = (body.action || 'capture').toString().trim();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const fromHeader = `${FROM_EMAIL_NAME} <${FROM_EMAIL_ADDRESS}>`;

    if (action === 'recovery') {
      // Send recovery email to customer
      const cartItems = body.cartItems || [];
      const cartTotal = body.cartTotal || 0;
      
      const itemsHtml = cartItems.map((item: any) => 
        `<tr><td style="padding:6px 0;">${escapeHtml(item.name || item.product?.name || 'Item')} ×${item.quantity || 1}</td><td style="padding:6px 0; text-align:right;">$${((item.price || item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}</td></tr>`
      ).join('');

      const recoveryHtml = `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
          <div style="background:#0f4c3a; padding:24px; text-align:center;">
            <h1 style="color:#fff; margin:0; font-size:24px;">Your Cart Is Waiting 🛒</h1>
          </div>
          <div style="padding:24px;">
            <p style="font-size:16px;">Hi there,</p>
            <p>We noticed you left some items in your cart. Don't worry — they're still there, ready for you!</p>
            <div style="background:#f0f7f4; border-radius:8px; padding:16px; margin:20px 0;">
              <table style="width:100%; border-collapse:collapse;">
                ${itemsHtml}
                <tr style="border-top:2px solid #0f4c3a;"><td style="padding:8px 0; font-weight:bold;">Total</td><td style="padding:8px 0; text-align:right; font-weight:bold;">$${cartTotal.toFixed(2)}</td></tr>
              </table>
            </div>
            <div style="text-align:center; margin:24px 0;">
              <a href="https://www.freshlocksealer.com/checkout" style="background:#0f4c3a; color:#fff; padding:12px 32px; border-radius:8px; text-decoration:none; font-weight:bold; display:inline-block;">Complete Your Order →</a>
            </div>
            <div style="background:#f0f7f4; border-radius:8px; padding:16px; margin:20px 0;">
              <p style="margin:0 0 8px; font-size:14px; font-weight:bold; color:#0f4c3a;">Still on the fence? Here's what you're getting:</p>
              <ul style="margin:0; padding-left:18px; font-size:13px; color:#333;">
                <li style="margin-bottom:4px;">💰 Pays for itself in weeks — the avg US household wastes $1,866/year in food</li>
                <li style="margin-bottom:4px;">📉 Same performance as $200–$400 countertop sealers, at a fraction of the cost</li>
                <li style="margin-bottom:4px;">🛡️ 2-year warranty + 60-day returns — zero risk to try</li>
                <li style="margin-bottom:4px;">🔋 USB-C rechargeable, no batteries or power cord needed</li>
                <li>📦 Works with any embossed valve bags — never locked into overpriced refills</li>
              </ul>
            </div>
            
            <p style="color:#666; font-size:14px;">Still have questions? Reply to this email and we'll help you out.</p>
            <p style="color:#888; font-size:12px; margin-top:32px;">FreshLock · support@freshlocksealer.com<br>You received this email because you started checkout at freshlocksealer.com</p>
          </div>
        </div>
      `;

      await sendEmail({
        host: SMTP_HOST,
        port: SMTP_PORT,
        user: SMTP_USER,
        pass: SMTP_PASS,
        from: fromHeader,
        to: [email],
        subject: '🛒 Your FreshLock cart is waiting for you!',
        html: recoveryHtml,
      });

      return NextResponse.json({ success: true, action: 'recovery_sent' });
    }

    // Default action: capture - notify support
    const cartItems = body.cartItems || [];
    const cartTotal = body.cartTotal || 0;
    
    const itemsHtml = cartItems.map((item: any) => 
      `<tr><td style="padding:4px 0;">${escapeHtml(item.name || item.product?.name || 'Item')} ×${item.quantity || 1}</td><td style="padding:4px 0; text-align:right;">$${((item.price || item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}</td></tr>`
    ).join('');

    const notifyHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; color: #222;">
        <h2 style="color:#0f4c3a; border-bottom:2px solid #0f4c3a; padding-bottom:8px;">Checkout Started — Cart Capture</h2>
        <p><strong>Customer Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Cart Total:</strong> $${cartTotal.toFixed(2)}</p>
        <table style="width:100%; border-collapse:collapse; margin:12px 0;">
          <tr style="border-bottom:1px solid #eee;"><th style="text-align:left; padding:4px 0;">Item</th><th style="text-align:right; padding:4px 0;">Price</th></tr>
          ${itemsHtml}
        </table>
        <p style="color:#888; font-size:12px;">If no order confirmation follows, this cart was abandoned. Consider a manual follow-up.</p>
      </div>
    `;

    await sendEmail({
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      pass: SMTP_PASS,
      from: fromHeader,
      to: [TO_EMAIL],
      subject: `[FreshLock] Checkout Started: ${email} — $${cartTotal.toFixed(2)}`,
      html: notifyHtml,
    });

    return NextResponse.json({ success: true, action: 'captured' });
  } catch (error: any) {
    console.error('Abandoned cart API error:', error?.message || error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
