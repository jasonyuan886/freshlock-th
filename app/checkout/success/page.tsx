'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout/success?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrderInfo(data);
            clearCart();
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
      <p className="text-gray-600 mb-2">Your order has been placed successfully.</p>
      
      {orderInfo?.customer_email && (
        <p className="text-gray-500 mb-6">
          A confirmation email has been sent to <strong>{orderInfo.customer_email}</strong>
        </p>
      )}

      {orderInfo?.amount_total && (
        <p className="text-2xl font-bold text-primary mb-8">
          Total: ${(orderInfo.amount_total / 100).toFixed(2)} USD
        </p>
      )}

      <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
        <h2 className="font-bold text-primary mb-3">What's Next?</h2>
        <ul className="space-y-2 text-gray-600">
          <li>📦 We'll prepare your order within 1-2 business days</li>
          <li>🚚 Standard shipping takes 3-7 business days</li>
          <li>📧 You'll receive a tracking number via email</li>
        </ul>
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/products" className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-20 text-center"><div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div><p className="text-gray-500">Loading...</p></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
