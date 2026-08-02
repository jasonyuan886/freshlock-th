'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';

import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE_UNDER } from '@/lib/data';

// NOTE: this page uses 'use client', so we rely on <head> via next/head if needed.
// meta robots noindex is applied via vercel.json headers for /checkout.

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE_UNDER;
  const total = totalPrice + shipping;

  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // 表单状态
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'US',
  });

  const COUNTRIES = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'JP', name: 'Japan' },
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'TH', name: 'Thailand' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [cartCaptured, setCartCaptured] = useState(false);
  const handleEmailBlur = () => {
    if (cartCaptured || !form.email || items.length === 0) return;
    setCartCaptured(true);
    fetch('/api/abandoned-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        cartItems: items,
        cartTotal: totalPrice,
      }),
    }).catch(() => {});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    try {
      if (paymentMethod === 'stripe') {
        // Stripe Checkout 跳转
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            shippingInfo: { email: form.email },
          }),
        });

        const data = await res.json();

        if (data.url) {
          // 跳转到 Stripe 托管结账页
          window.location.href = data.url;
        } else if (data.error) {
          setError(data.error);
          setProcessing(false);
        } else {
          // Demo 模式 — 未配置 Stripe 密钥
          alert('⚠️ Stripe 尚未配置。\n请在 .env.local 中填入你的 Stripe API Key 后重试。\n\n当前为演示模式，订单已模拟提交。');
          clearCart();
          setProcessing(false);
        }
      } else if (paymentMethod === 'paypal') {
        // PayPal Checkout 跳转
        const res = await fetch('/api/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(item => ({
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
            })),
            shippingAddress: {
              name: `${form.firstName} ${form.lastName}`,
              address: form.address,
              city: form.city,
              state: form.state,
              postalCode: form.postcode,
              country: form.country,
            },
          }),
        });

        const data = await res.json();

        if (data.approvalUrl) {
          // 跳转到 PayPal 支付页面
          window.location.href = data.approvalUrl;
        } else if (data.error) {
          setError(data.error);
          setProcessing(false);
        } else {
          alert('⚠️ PayPal 尚未配置。\n请在 .env.local 中填入你的 PayPal API 凭证后重试。');
          setProcessing(false);
        }
      } else if (paymentMethod === 'afterpay') {
        alert('Afterpay 集成需要商户账号，请联系 FreshLock 客服开通。');
        setProcessing(false);
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Nothing to Checkout</h1>
        <p className="text-gray-500 mb-8">Your cart is empty.</p>
        <Link href="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="font-bold text-primary text-lg mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName" autoComplete="given-name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName" autoComplete="family-name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email" autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    required
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone" autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="font-bold text-primary text-lg mb-4">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address" autoComplete="street-address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="123 Example Street"
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City / Suburb</label>
                  <input
                    type="text"
                    name="city" autoComplete="address-level2"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state" autoComplete="address-level1"
                    value={form.state}
                    onChange={handleChange}
                    required
                    placeholder="State / Province"
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    name="postcode" autoComplete="postal-code"
                    value={form.postcode}
                    onChange={handleChange}
                    required
                    placeholder="90210"
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-xl p-4 shadow flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
              <span className="flex items-center gap-1.5 font-medium"><span className="text-green-600 text-base">🔒</span> SSL Encrypted</span>
              <span className="flex items-center gap-1.5 font-medium"><span className="text-blue-600 text-base">🛡️</span> PayPal Protected</span>
              <span className="flex items-center gap-1.5 font-medium"><span className="text-orange-500 text-base">↩️</span> 60-Day Returns</span>
              <span className="flex items-center gap-1.5 font-medium"><span className="text-purple-600 text-base">✅</span> 2-Year Warranty</span>
              <span className="flex items-center gap-1.5 font-medium"><span className="text-green-600 text-base">🚚</span> DHL Express 5–8 Days</span>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="font-bold text-primary text-lg mb-4">Payment Method</h2>
              <div className="space-y-3">
                {/* Credit/Debit Card via Stripe — disabled per Stripe ban 2026-07-30
                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'stripe' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-primary"
                  />
                  <div>
                    <span className="font-medium">💳 Credit / Debit Card</span>
                    <p className="text-xs text-gray-500 mt-0.5">Visa, Mastercard, Amex — securely processed</p>
                  </div>
                </label>
                */}
                <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === 'paypal' ? 'border-[#003087] bg-[#003087]/5' : 'hover:bg-gray-50 border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#003087] mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center font-bold text-[#003087] bg-[#ffc439] px-2 py-0.5 rounded text-sm tracking-wide">PayPal</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">🛡️ Buyer Protection</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Pay securely with your PayPal account, or check out as a guest using Visa, Mastercard, Amex, or Discover. <strong className="text-[#003087]">Eligible purchases are covered by PayPal Buyer Protection.</strong></p>
                  </div>
                </label>
                {/* Afterpay — not integrated yet, hidden to avoid false promise
                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'afterpay' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="afterpay"
                    checked={paymentMethod === 'afterpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-primary"
                  />
                  <div>
                    <span className="font-medium">🟣 Afterpay</span>
                    <p className="text-xs text-gray-500 mt-0.5">4 interest-free payments</p>
                  </div>
                </label>
                */}
              </div>

              {/* 安全提示 */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-start gap-2">
                <span className="text-green-600">🔒</span>
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow sticky top-24">
              <h2 className="font-bold text-primary text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.slug} className="flex gap-3">
                    <Image src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                {/* Free shipping progress bar */}
                {totalPrice < FREE_SHIPPING_THRESHOLD ? (
                  <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-2">
                    <p className="text-xs font-semibold text-amber-800 mb-1.5">
                      🚚 Add ${(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2)} more for FREE shipping
                      <span className="text-amber-700 font-normal"> (save ${SHIPPING_FEE_UNDER.toFixed(2)})</span>
                    </p>
                    <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                      />
                    </div>
                    <Link href="/cart" className="text-xs text-accent font-semibold hover:underline mt-1.5 inline-block">
                      ← Return to cart to add items
                    </Link>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-400 rounded-lg p-3 mb-2">
                    <p className="text-xs font-semibold text-green-700 text-center">
                      🎉 You've unlocked FREE US shipping!
                    </p>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)} USD</span>
              </div>
              <button
                type="submit"
                disabled={processing}
                className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay $${total.toFixed(2)} USD`
                )}
              </button>
              <div className="mt-3 flex flex-wrap gap-2 justify-center text-[10px] text-gray-400">
                <span>🔒 SSL Secure Checkout</span>
                <span>·</span>
                <span>Visa / MC / Amex / Discover / PayPal</span>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Free shipping over $89 · Starter Kits ship free · 60-day returns · 2-year warranty
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
