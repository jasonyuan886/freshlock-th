import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, reviews as allReviews, FREE_SHIPPING_THRESHOLD, ratingDistribution } from '@/lib/data';
import type { Product } from '@/lib/types';
import { generateProductSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/schema';
import AddToCartClient from './AddToCartClient';
import GalleryClient from './GalleryClient';
import FrequentlyBoughtTogether from '@/components/FrequentlyBoughtTogether';
import Image from 'next/image';
import PriceDisplay from '@/components/PriceDisplay';
import FomoLiveViewers from '@/components/FomoLiveViewers';
import FomoStockIndicator from '@/components/FomoStockIndicator';
import FomoCountdownTimer from '@/components/FomoCountdownTimer';

type Params = { slug: string };

function First100ReviewersBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`bg-green-50 border-2 border-green-500/40 rounded-xl ${compact ? 'p-4 mt-4' : 'p-5 mt-5'}`}>
      <p className={`font-bold text-green-800 ${compact ? 'text-sm' : 'text-base'} mb-1`}>🎁 เป็นหนึ่งใน 100 รีวิวแรกของเรา — รับถุงฟรี!</p>
      <p className={`text-green-900/80 ${compact ? 'text-xs' : 'text-sm'} mb-3`}>แสดงความคิดเห็นที่ซื่อสัตย์ภายใน 30 วันหลังจากซื้อ แล้วเราจะส่ง <strong>ถุงเติม 30 แพ็คฟรี</strong> (มูลค่า $29.99) หลังจากการตรวจสอบ</p>
      <a
        href="mailto:freshlocksealer@gmail.com?subject=FreshLock%20Product%20Review%20%28First%20100%20Reviewers%29&body=Hi%20FreshLock%2C%0A%0AOrder%20%23%3A%20%28please%20include%20your%20order%20number%29%0A%0AI%27d%20like%20to%20leave%20a%20review%20of%20my%20FreshLock%20purchase%20and%20claim%20the%20First%20100%20Reviewers%20free%20bag%20set.%0A%0A--%20Paste%20your%20review%20below%20--%0A%0AStar%20rating%20%281-5%29%3A%0AReview%3A%0A"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
      >
        ✍️ เขียนรีวิวและรับถุงฟรี
      </a>
      <p className="text-[10px] text-green-700/60 mt-2">รีวิวต้องเป็นของจริงและจากผู้ซื้อที่ผ่านการตรวจสอบ เราไม่จ่ายเงินสำหรับรีวิวเชิงบวก</p>
    </div>
  );
}

function StickyMobileATC({ product }: { product: { name: string; price: number; compareAtPrice?: number; discountBadge?: string; slug: string } }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 px-4 py-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 truncate">{product.name}</div>
        <div className="flex items-baseline gap-2">
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
          <span className="text-accent font-bold">${product.price.toFixed(2)}</span>
          {product.discountBadge && (
            <span className="text-[10px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded-full border border-red-200">
              {product.discountBadge}
            </span>
          )}
        </div>
      </div>
      <a href="#purchase" className="btn-primary text-sm px-5 py-2 whitespace-nowrap">
        เพิ่มลงตะกร้า
      </a>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  const title = `${product.name} — ป้องกันฟรีเซอร์เบิร์น ปลอด BPA`;
  const description =
    `${product.shortDescription} จัดส่งฟรีเมื่อสั่งเกิน $${FREE_SHIPPING_THRESHOLD} คืนสินค้า 7 วัน รับประกัน 1 ปีสำหรับตัวเครื่อง`;
  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
      languages: {
        'en-US': `https://www.freshlocksealer.com/products/${product.slug}`,
        'ja-JP': `https://jp.freshlocksealer.com/products/${product.slug}`,
        'x-default': `https://www.freshlocksealer.com/products/${product.slug}`,
      },
    },
    openGraph: {
      url: `${SITE_URL}/products/${product.slug}`,
      title,
      description,
      images: product.images.map((src) => ({
        url: src,
        width: 1200,
        height: 630,
        alt: `${product.name} — ${product.shortDescription}`,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  };
}

function StarRating({ rating, size = 'text-base' }: { rating: number; size?: string }) {
  return (
    <span className={`text-accent ${size}`} aria-label={`ให้คะแนน ${rating} จาก 5`}>
      {'★'.repeat(rating)}
      <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

function ReviewsSection() {
  const avg = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);
  const total = allReviews.length;
  return (
    <section id="reviews" className="mt-16 border-t pt-12" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-2xl font-bold text-primary mb-6">รีวิวจากลูกค้า</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-primary">{avg}</div>
          <div className="flex justify-center md:justify-start mt-1"><StarRating rating={Math.round(Number(avg))} /></div>
          <p className="text-sm text-gray-500 mt-1">{total} รีวิวที่ผ่านการตรวจสอบ</p>
        </div>
        <div className="md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = (ratingDistribution as Record<number, number>)[star] || 0;
            const pct = total ? (count / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-10 text-gray-600">{star} ★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right text-gray-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {allReviews.map((r) => (
          <article key={r.name + r.date} className="bg-white border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <StarRating rating={r.rating} size="text-sm" />
              {r.verified && (
                <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">✓ ผู้ซื้อที่ผ่านการตรวจสอบ</span>
              )}
            </div>
            <p className="text-gray-700 text-sm mb-3">&ldquo;{r.text}&rdquo;</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-primary">{r.name}</span>
              <time dateTime={r.date}>
                {new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            {r.images && r.images.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {r.images.map((src, i) => (
                  <div key={i} className="relative w-20 h-20 rounded border border-gray-200 overflow-hidden">
                    <Image
                      src={src}
                      alt={`รูปรีวิวโดย ${r.name}`}
                      fill
                      sizes="80px"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8">
        <First100ReviewersBlock />
      </div>
    </section>
  );
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await Promise.resolve(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const getBundleProducts = () => {
    if (product.slug === 'freshlock-pro' || product.slug === 'freshlock-starter-kit') {
      return products.filter((p) => p.slug === 'vacuum-seal-bags-10-pack');
    }
    if (product.category === 'bags') {
      if (product.slug === 'vacuum-seal-bags-10-pack') {
        return products.filter((p) => p.slug === 'vacuum-seal-bags-30-pack');
      }
      return products.filter((p) => p.slug === 'vacuum-seal-bags-30-pack');
    }
    return [];
  };
  const bundleProducts = getBundleProducts();

  const productSchema = generateProductSchema(product, allReviews);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'หน้าแรก', url: '/' },
    { name: 'สินค้า', url: '/products' },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  const pdpFaqs = [
    {
      q: 'ฉันจะหยุดฟรีเซอร์เบิร์นได้อย่างไร?',
      a: 'ฟรีเซอร์เบิร์นเกิดจากอากาศที่ถึงพื้นผิวอาหาร FreshLock ดูดอากาศออกจากถุงได้ถึง 95% และวาล์วทางเดียวช่วยกันอากาศออก — ลดฟรีเซอร์เบิร์นบนเนื้อสัตว์ ปลา ขนมปัง และผักผลไม้อย่างมาก',
    },
    {
      q: 'แบตเตอรี่ชาร์จได้ไหมและใช้ได้นานแค่ไหน?',
      a: 'ใช่ แบตเตอรี่ Li-ion 1200 mAh ชาร์จผ่าน USB-C (สายรวมอยู่) ในเวลาประมาณ 2.5 ชั่วโมง และซีลได้ 80–100 ครั้งต่อการชาร์จเต็ม — เพียงพอสำหรับการใช้งานในครัวหลายสัปดาห์',
    },
    {
      q: 'ฉันสามารถซีลซุป น้ำหมัก และอาหารที่มีน้ำได้ไหม?',
      a: 'ได้ ถาดรองน้ำแบบถอดได้โปร่งใสใต้หัวฉีดจะรับน้ำล้นก่อนที่จะถึงมอเตอร์ สำหรับอาหารที่เปียกมาก เราแนะนำให้ซีลโดยถือถุงตั้งตรงหรือแช่แข็งล่วงหน้า 30 นาที',
    },
    {
      q: 'ฉันต้องซื้อถุง FreshLock โดยเฉพาะตลอดไปไหม?',
      a: 'ไม่ FreshLock ใช้ได้กับถุงลายนูนมีวาล์วส่วนใหญ่ (ฟิล์ม PA+PE หนา 90 μm ขึ้นไปพร้อมวาล์วอากาศทางเดียวมาตรฐาน) คุณสามารถใช้แบรนด์ใดก็ได้ที่พอดี',
    },
    {
      q: 'การรับประกันครอบคลุมอะไรบ้าง?',
      a: 'รับประกัน 1 ปีสำหรับตัวเครื่อง รับประกัน 6 เดือนสำหรับอุปกรณ์เสริม (สาย ถุงเริ่มต้น) ติดต่อ support@freshlocksealer.com สำหรับการเคลมการรับประกัน',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: pdpFaqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ATF Trust badges */}
        <div className="flex flex-wrap gap-3 mb-6 text-sm" aria-label="Trust badges">
          <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">🚚 จัดส่งฟรี ${FREE_SHIPPING_THRESHOLD}+</span>
          {product.badge === 'Best Value' || product.slug.includes('kit') ? (
            <span className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold">🎁 จัดส่งฟรี</span>
          ) : null}
          <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">↩️ คืนสินค้า 7 วัน</span>
          <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">🛡️ รับประกัน 1 ปี</span>
          <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">🔒 ชำระเงิน SSL ปลอดภัย</span>
        </div>

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center">
            <li><Link href="/" className="hover:text-primary">หน้าแรก</Link></li>
            <li className="mx-2" aria-hidden="true">/</li>
            <li><Link href="/products" className="hover:text-primary">สินค้า</Link></li>
            <li className="mx-2" aria-hidden="true">/</li>
            <li className="text-gray-900" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <article className="grid md:grid-cols-2 gap-12">
          <GalleryClient
            images={product.images && product.images.length > 0 ? product.images : [product.image]}
            name={product.name}
            shortDescription={product.shortDescription}
          />

          <section>
            {product.badge && (
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{product.name}</h1>

            {/* FOMO: Live viewers */}
            <FomoLiveViewers />

            {/* Mini rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={5} size="text-sm" />
              <span className="text-sm text-gray-500">{allReviews.length} รีวิวที่ผ่านการตรวจสอบ</span>
            </div>

            <div className="mb-6">
              <PriceDisplay
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                discountBadge={product.discountBadge}
                size="lg"
              />
            </div>

            {/* Value breakdown — anchor high perceived value */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-5">
              <p className="text-sm font-bold text-green-800 mb-2">💡 ทำไมถึงคุ้มค่ามากกว่า $${product.price.toFixed(2)}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-green-900">
                <div className="flex items-start gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span>เครื่องสูญญากาศแบบตั้งโต๊ะทั่วไปราคา <strong>฿7,000–฿14,000</strong> FreshLock ทำงานเดียวกันในราคาเศษเสี้ยว</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span>ครัวเรือนทั่วไปทิ้งอาหารไป <strong>฿65,310/ปี</strong> สินค้านี้คุ้มทุนในไม่กี่สัปดาห์</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span>ชาร์จ USB-C — <strong>ไม่ต้องใช้แบตเตอรี่ ไม่ต้องเสียบปลั๊ก</strong> ซีลได้ 80–100 ครั้งต่อการชาร์จ</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span>ใช้ได้กับ <strong>ถุงลายนูนมีวาล์วแบบใดก็ได้</strong> — ไม่ถูกผูกขาดด้วยถุงราคาแพง</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span><strong>รับประกัน 1 ปี</strong> + คืนสินค้า 7 วัน = ไม่มีความเสี่ยงในการลอง</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span>ขนาดกระทัดรัด <strong>210 g</strong> — ใส่ในลิ้นชักได้ เอาไปแคมป์ เที่ยว ที่ไหนก็ได้</span>
                </div>
              </div>
              <p className="text-xs text-green-700 mt-3 font-medium border-t border-green-200 pt-2">
                มูลค่ารวม: <span className="line-through text-green-500">$320+</span> — ของคุณในราคา <span className="font-bold">${product.price.toFixed(2)}</span>
              </p>
            </div>

            {/* FOMO: Stock indicator */}
            <FomoStockIndicator initialStock={15} />

            {/* Differentiator callouts */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs font-bold text-blue-700">💧 ซีลน้ำหมักและของเหลว</p>
                <p className="text-[11px] text-blue-600 mt-1 leading-tight">ถาดรองน้ำแบบถอดได้รับซุป น้ำหมัก และน้ำเนื้อสัตว์ — น้ำไม่เข้ามอเตอร์</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                <p className="text-xs font-bold text-orange-700">🔥 ไม่มีแถบความร้อนที่จะไหม้</p>
                <p className="text-[11px] text-orange-600 mt-1 leading-tight">ดีไซน์แบบปั๊มลมล้วน — ไม่มีองค์ประกอบความร้อน ปลอดภัยรอบเด็กและทนนานกว่าหลายปี</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <section className="mb-8">
              <h2 className="font-semibold text-primary mb-3 text-lg">คุณสมบัติเด่น</h2>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-accent mt-0.5" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            <div id="purchase">
              <FomoCountdownTimer variant="pdp" />
              <AddToCartClient product={product} />
            </div>

            <First100ReviewersBlock compact />

            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
              <span>🚚 จัดส่งฟรีเมื่อสั่งเกิน ${FREE_SHIPPING_THRESHOLD}</span>
              <span>↩️ คืนสินค้า 7 วันไม่ยุ่งยาก</span>
              <span>🛡️ รับประกัน 1 ปี</span>
              <span>🔒 ชำระเงิน SSL ปลอดภัย</span>
            </div>

            {/* Specs */}
            <section className="bg-[#FFF8F0] rounded-xl p-6 mt-6">
              <h2 className="font-semibold text-primary mb-3 text-lg">ข้อมูลจำเพาะ</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-b border-gray-200 py-1.5">
                    <dt className="text-gray-500 text-xs uppercase tracking-wide">{key}</dt>
                    <dd className="font-medium text-gray-900 mt-0.5">{val}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-8">
              <h2 className="font-semibold text-primary mb-3 text-lg">คำถามที่พบบ่อย</h2>
              <div className="space-y-4 text-sm text-gray-600">
                {pdpFaqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-semibold text-gray-800">{f.q}</h3>
                    <div>
                      <p className="leading-relaxed mt-1">{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {['BPA-free', 'FCC / CE / RoHS', 'วัสดุปลอดภัยสำหรับอาหาร', 'USB-C', 'ถาดรองน้ำแบบถอดได้'].map((b) => (
                <span key={b} className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{b}</span>
              ))}
            </div>
          </section>
        </article>

        <ReviewsSection />

        {bundleProducts.length > 0 && (
          <FrequentlyBoughtTogether
            mainProduct={product}
            bundleProducts={bundleProducts}
            discountPercent={10}
          />
        )}

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="section-title mb-8">คุณอาจชอบสิ่งนี้</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <Image src={p.image}
                    alt={`${p.name} — ${p.shortDescription}`}
                    className="w-full aspect-square object-contain bg-stone-50"
                    width={400}
                    height={400}
                    loading="lazy" />
                  <div className="p-4">
                    <h3 className="font-bold text-primary mb-1">{p.name}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-2">{p.shortDescription}</p>
                    <PriceDisplay
                      price={p.price}
                      compareAtPrice={p.compareAtPrice}
                      discountBadge={p.discountBadge}
                      size="sm"
                      showCurrencyLabel
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <StickyMobileATC product={product} />
      <div className="md:hidden h-20" />
    </>
  );
}
