'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE_UNDER, products } from '@/lib/data';
import Image from 'next/image';
import { useMemo } from 'react';

export const dynamic = 'force-dynamic';

/** Smart "add more to unlock free shipping" recommender.
 *  - Finds products NOT already in cart that would close the gap
 *  - Starter Kit itself ships free (>= $89), but we don't recommend it
 *    as an upsell if you already have the sealer — recommend bags instead.
 *  - If bag prices don't close the gap, recommend "add another bag pack".
 */
function getFreeShipRecommendations(
  currentTotal: number,
  cartSlugs: string[],
): Array<{ slug: string; name: string; price: number; image: string; reason: string }> {
  const gap = Math.max(0, FREE_SHIPPING_THRESHOLD - currentTotal);
  if (gap === 0) return [];

  const bagProducts = products.filter(
    (p) => p.category === 'bags' && !cartSlugs.includes(p.slug),
  );
  // If user already has all bag SKUs in cart, suggest adding quantity of cheapest bag
  const cheapestBag = products
    .filter((p) => p.category === 'bags')
    .sort((a, b) => a.price - b.price)[0];

  const recs: Array<{ slug: string; name: string; price: number; image: string; reason: string }> = [];

  // 1) Single bag that closes the gap — prefer cheapest that still covers the gap
  const closesGap = bagProducts
    .filter((p) => p.price >= gap - 0.01)
    .sort((a, b) => a.price - b.price);
  if (closesGap.length > 0) {
    const p = closesGap[0];
    recs.push({
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.image,
      reason: `Add it — unlocks FREE shipping (you save $${SHIPPING_FEE_UNDER.toFixed(2)})`,
    });
  }

  // 2) Cheapest bag (even if not enough alone — good for stacking)
  const cheapBagNotShown =
    cheapestBag &&
    !recs.some((r) => r.slug === cheapestBag.slug) &&
    !cartSlugs.includes(cheapestBag.slug);
  if (cheapBagNotShown) {
    const qty = Math.ceil(gap / cheapestBag.price);
    recs.push({
      slug: cheapestBag.slug,
      name: cheapestBag.name,
      price: cheapestBag.price,
      image: cheapestBag.image,
      reason:
        qty === 1
          ? `Add 1 pack — only $${(gap - cheapestBag.price).toFixed(2)} away after`
          : `Add ${qty} packs — ships FREE`,
    });
  }

  // 3) If user already has both bag SKUs, suggest adding more of cheapest
  if (recs.length === 0 && cheapestBag) {
    recs.push({
      slug: cheapestBag.slug,
      name: `More ${cheapestBag.name}`,
      price: cheapestBag.price,
      image: cheapestBag.image,
      reason: `Add another pack — ${
        cheapestBag.price >= gap ? 'unlocks FREE shipping' : `only $${(gap - cheapestBag.price).toFixed(2)} more after`
      }`,
    });
  }

  return recs.slice(0, 2);
}

function FreeShippingProgress({ total }: { total: number }) {
  const isFree = total >= FREE_SHIPPING_THRESHOLD;
  const pct = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const away = (FREE_SHIPPING_THRESHOLD - total).toFixed(2);

  return (
    <div
      className={`rounded-xl p-4 mb-4 border-2 ${
        isFree
          ? 'bg-green-50 border-green-400'
          : 'bg-amber-50 border-amber-300'
      }`}
    >
      {isFree ? (
        <p className="text-sm font-semibold text-green-700 text-center">
          🎉 You've unlocked FREE shipping!
        </p>
      ) : (
        <>
          <p className="text-sm font-semibold text-amber-800 mb-2">
            🚚 Add <span className="text-accent">${away}</span> more for FREE shipping
            <span className="text-xs text-amber-700 font-normal"> (save ${SHIPPING_FEE_UNDER.toFixed(2)})</span>
          </p>
          <div className="w-full bg-amber-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, addToCart } = useCart();
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE_UNDER;
  const total = totalPrice + shipping;
  const cartSlugs = useMemo(() => items.map((i) => i.product.slug), [items]);
  const recs = useMemo(
    () => getFreeShipRecommendations(totalPrice, cartSlugs),
    [totalPrice, cartSlugs],
  );

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you have not added anything yet.</p>
        <Link href="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.slug}
              className="bg-white rounded-xl p-4 sm:p-6 shadow flex gap-4 sm:gap-6"
            >
              <Link href={`/products/${item.product.slug}`}>
                <Image
                  src={item.product.image}
                  alt={`${item.product.name} — ${item.product.shortDescription}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                  width={128}
                  height={128}
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.product.slug}`}>
                  <h2 className="font-bold text-primary hover:underline">{item.product.name}</h2>
                </Link>
                <p className="text-accent font-bold mt-1">${item.product.price.toFixed(2)} USD</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                      className="px-3 py-1.5 text-sm hover:bg-gray-100 transition"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                      className="px-3 py-1.5 text-sm hover:bg-gray-100 transition"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.slug)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-bold text-lg">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow h-fit sticky top-24">
          <h2 className="font-bold text-primary text-lg mb-4">Order Summary</h2>

          {/* Free shipping progress bar */}
          <FreeShippingProgress total={totalPrice} />

          <div className="space-y-2 text-sm border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${totalPrice.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  `$${shipping.toFixed(2)} USD`
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)} USD</span>
          </div>
          <Link href="/checkout" className="btn-primary w-full block text-center">
            Proceed to Checkout
          </Link>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
            <span className="inline-flex items-center font-bold text-[#003087] bg-[#ffc439] px-2 py-0.5 rounded text-xs tracking-wide">PayPal</span>
            <span>🛡️ Buyer Protection included</span>
          </div>
          <Link
            href="/products"
            className="block text-center text-sm text-gray-500 hover:text-primary mt-2"
          >
            ← Continue Shopping
          </Link>

          {/* Smart bundle recommendations to reach free shipping */}
          {recs.length > 0 && (
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                🎁 Add these to ship FREE
              </p>
              <div className="space-y-3">
                {recs.map((rec) => {
                  const fullProduct = products.find((p) => p.slug === rec.slug);
                  return (
                    <div key={rec.slug} className="flex gap-3 items-center">
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-primary truncate">{rec.name}</p>
                        <p className="text-xs text-green-700">{rec.reason}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (fullProduct) addToCart(fullProduct);
                        }}
                        className="shrink-0 bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-accent/90 transition"
                      >
                        + Add ${rec.price.toFixed(2)}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-4 text-center">
            🔒 Secure SSL checkout · 60-day returns · 2-year warranty
          </p>
        </div>
      </div>
    </div>
  );
}
