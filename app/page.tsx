import Link from 'next/link';
import { products, reviews, faqs, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import PriceDisplay from '@/components/PriceDisplay';
import FomoCountdownTimer from '@/components/FomoCountdownTimer';
import { getAllPosts } from '@/lib/blog';
import { generateFAQSchema } from '@/lib/schema';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://th.freshlocksealer.com/',
  },
};


const faqSchema = generateFAQSchema(faqs.slice(0, 3));

function StarRating({ rating }: { rating: number }) {
  return (
    <span aria-label={`ให้คะแนน ${rating} จาก 5`}>
      {'★'.repeat(rating)}
      <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

function Hero() {
  return (
    <section className="bg-primary text-white" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-accent/20 text-accent text-sm font-semibold px-3 py-1 rounded-full mb-4">
              💧 ซีลแกง น้ำพริก และเนื้อดองได้ โดยไม่ทำลายมอเตอร์
            </span>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              FreshLock Pro<br />
              <span className="text-accent">เครื่องซีลสูญญากาศแบบพกพา</span>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-lg">
              เครื่องซีลสุญญากาศไร้สายเพียงเครื่องเดียวที่มี{' '}
              <strong>ถาดรองน้ำแบบถอดได้</strong> กักเก็บแกง น้ำพริก ซอส
              และเนื้อสด <em>ก่อน</em> ถึงมอเตอร์ ไม่มีพัดลมอุดตน ไม่มีมอเตอร์ไหม้
              — สุญญากาศ -60 kPa กดปุ่มเดียว รักษาความสดได้{' '}
              <strong>นานขึ้น 5 เท่า</strong> ชาร์จ USB-C ใช้ได้กับ{' '}
              <strong>ถุงสุญญากาศส่วนใหญ่</strong> ไม่ต้องใช้ยี่ห้อเดียว
            </p>
            <div className="flex flex-wrap gap-2 mb-8 text-sm">
              {[
                '💧 ถาดรองน้ำ (ซีลแกง/น้ำพริก/เนื้อดองได้)',
                '🔌 USB-C · 80-100 ครั้ง/ชาร์จ',
                '🔇 เสียงต่ำกว่า 60 เดซิเบล',
                '♻️ ใช้ได้กับถุงส่วนใหญ่',
                '🛡️ รับประกัน 1 ปี',
              ].map((b) => (
                <span key={b} className="bg-white/10 text-white text-xs px-2.5 py-1 rounded-full border border-white/20">
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products/freshlock-pro" className="btn-primary text-lg">
                ซื้อ FreshLock Pro — $69.99
              </Link>
              <Link href="#features" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
                ดูฟีเจอร์
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
              <span>🚚 จัดส่งฟรีเมื่อสั่งเกิน ${FREE_SHIPPING_THRESHOLD}</span>
              <span>↩️ คืนสินค้า 7 วัน</span>
              <span>🔒 ชำระเงินปลอดภัย SSL</span>
            </div>
          </div>
          <div className="flex justify-center md:justify-center mt-8 md:mt-0">
            <Image src="/images/products/sealer-main.jpg"
              alt="FreshLock Pro เครื่องซีลสูญญากาศแบบพกพา สีขาว พร้อมถาดรองน้ำถอดได้ และถุงสุญญากาศสีเขียว"
              className="rounded-2xl shadow-2xl w-64 md:w-full max-w-md md:max-w-none"
              width={600}
              height={600}
              priority
              sizes="(max-width: 768px) 256px, 600px" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutFreshLock() {
  return (
    <section id="about" className="py-20 bg-white" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h2 id="about-heading" className="section-title">ออกแบบเพื่อครัวจริง</h2>
        </header>
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
          <p>
            <strong>FreshLock</strong> คือเครื่องซีลสุญญากาศแบบพกพาไร้สาย ออกแบบเพื่อคนที่รักอาหารและเกลียดขยะ ไม่ว่าจะทำอาหารล่วงหน้า แบ่งอาหารเด็ก ดองเนื้อสำหรับย่าง หรือเก็บขนมไปตั้งแคมป์ FreshLock ดูดสุญญากาศ -60 kPa ได้ในไม่กี่วินาที
          </p>
          <p>
            ต่างจากเครื่องซีลตั้งโต๊ะที่ใหญ่และหนัก FreshLock Pro ใช้กับถุงซิปสุญญากาศที่มีวาล์วอากาศทางเดียว — <strong>ไม่มีแถบความร้อน ไม่ต้องเรียนรู้</strong> <strong>ถาดรองน้ำโปร่งแสงถอดได้</strong> กักเก็บของเหลวก่อนถึงมอเตอร์ ทำให้ซีลซุป เนื้อดอง และอาหารที่มีน้ำได้สะอาด มอเตอร์แห้ง
          </p>
          <p>
            ใช้ได้กับ <strong>ถุงสุญญากาศส่วนใหญ่</strong> ในตลาด ไม่ต้องใช้ยี่ห้อเดียวกัน ชาร์จผ่านสาย USB-C ดูดได้ 80-100 ครั้งต่อการชาร์จ พร้อมรับประกัน 1 ปี
          </p>
        </article>
      </div>
    </section>
  );
}

const featureList = [
  {
    icon: '🧊',
    title: 'ป้องกันน้ำแข็งจับ',
    text: 'ดูดอากาศออกได้ถึง 95% ป้องกันผลึกน้ำแข็งและออกซิเดชัน เนื้อสัตว์ ปลา และผักสดได้นานเป็นเดือน',
  },
  {
    icon: '💧',
    title: 'ถาดรองน้ำสำหรับของเหลว',
    text: 'ถาดโปร่งแสงถอดได้ กักเก็บแกง น้ำพริก ซอส และเนื้อสดก่อนถึงมอเตอร์ ล้างในจานล้างจานได้',
  },
  {
    icon: '👆',
    title: 'กดปุ่มเดียวง่ายๆ',
    text: 'นำหัวดูดไปแตะวาล์ว กดครั้งเดียว พัดลมหยุดอัตโนมัติเมื่อถุงแน่น ไม่มีแถบความร้อน ไม่ต้องตั้งค่า',
  },
  {
    icon: '🔌',
    title: 'ชาร์จ USB-C',
    text: 'แบตเตอรี่ 1200 mAh ชาร์จ ~2.5 ชม. ดูด 80-100 ครั้งต่อชาร์จ ใช้สาย USB-C หรือพาวเวอร์แบงก์ได้',
  },
  {
    icon: '🔇',
    title: 'เสียงเงียบ',
    text: 'ต่ำกว่า 60 เดซิเบลขณะทำงาน เบาพอใช้ตอนเช้าตรู่หรือในครัวเปิด',
  },
  {
    icon: '♻️',
    title: 'ใช้ได้กับถุงส่วนใหญ่',
    text: 'ใช้ได้กับถุงสุญญากาศส่วนใหญ่ ไม่ต้องซื้อยี่ห้อเดียว แนะนำถุง PA+PE แบบ BPA-free',
  },
  {
    icon: '⚖️',
    title: 'เบาและกะทัดรัด',
    text: 'น้ำหนักเพียง ~210 กรัม เก็บในลิ้นชักครัว กระเป๋า หรือกล่องเย็นสำหรับแคมป์ปิ้ง',
  },
  {
    icon: '🛡️',
    title: 'รับประกัน 1 ปี',
    text: 'รับประกัน 1 ปีสำหรับตัวเครื่อง เรายืนหยัดเคียงข้างทุกเครื่องที่ส่งมอบ',
  },
];

function Features() {
  return (
    <section id="features" className="py-20 bg-[#FFF8F0]" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="features-heading" className="section-title">ทำไมต้อง FreshLock?</h2>
          <p className="section-subtitle">
            ฟีเจอร์ที่คนทำครัวสนใจจริง ไม่ใช่แค่โฆษณา
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((f) => (
            <article
              key={f.title}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4" aria-hidden="true">{f.icon}</div>
              <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section className="py-20 bg-white" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="products-heading" className="section-title">สินค้าของเรา</h2>
          <p className="section-subtitle">
            เริ่มจากเครื่องซีลหรือซื้อชุดครบ — จัดส่งรวดเร็ว
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <div className="relative overflow-hidden">
                <Image src={p.image}
                  alt={`${p.name} — ${p.shortDescription}`}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
                  width={400}
                  height={400}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-primary mb-1">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{p.shortDescription}</p>
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
        <div className="text-center mt-10">
          <Link href="/products" className="btn-secondary">ดูสินค้าทั้งหมด</Link>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-12 bg-primary text-white" aria-label="สถิติ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['4.6 ★', 'คะแนนเฉลี่ย'],
            ['-60 kPa', 'สุญญากาศแรง'],
            ['ฟรี', `จัดส่งเมื่อสั่งเกิน $${FREE_SHIPPING_THRESHOLD}`],
            ['7 วัน', 'คืนสินค้า'],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold text-accent">{stat}</p>
              <p className="text-sm text-gray-300 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const topReviews = reviews.slice(0, 4);
  return (
    <section className="py-20 bg-[#FFF8F0]" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="reviews-heading" className="section-title">ลูกค้าที่ยืนยันแล้วพูดถึงเรา</h2>
          <p className="section-subtitle">
            รีวิวจริงจากลูกค้าจริง — มีทั้ง 5 ดาวและ 4 ดาวเพื่อความน่าเชื่อถือ
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topReviews.map((r) => (
            <article key={r.name} className="bg-white rounded-xl p-5 shadow-sm" itemScope itemType="https://schema.org/Review">
              <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Product">
                <meta itemProp="name" content="FreshLock Pro เครื่องซีลสูญญากาศแบบพกพา" />
              </div>
              <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={String(r.rating)} />
                <meta itemProp="bestRating" content="5" />
                <meta itemProp="worstRating" content="1" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-accent text-sm" aria-label={`ให้คะแนน ${r.rating} จาก 5`}>
                  <StarRating rating={r.rating} />
                </div>
                {r.verified && (
                  <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    ✓ ผู้ซื้อที่ยืนยันแล้ว
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-3 text-sm italic line-clamp-5" itemProp="reviewBody">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <p className="font-semibold text-primary" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{r.name}</span>
                </p>
                <time dateTime={r.date}>
                  {new Date(r.date).toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })}
                </time>
              </div>
              {r.images && r.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {r.images.map((src, i) => (
                    <div key={i} className="w-14 h-14 rounded overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center text-[9px] text-gray-400">
                      📷 รูป
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/products/freshlock-pro#reviews" className="btn-secondary">อ่านรีวิวทั้งหมด</Link>
          <a
            href="mailto:freshlocksealer@gmail.com?subject=FreshLock%20Review"
            className="text-primary font-semibold hover:underline text-sm"
          >
            ✍️ เขียนรีวิว
          </a>
        </div>
      </div>
    </section>
  );
}

const qaItems = [
  {
    q: 'ป้องกันน้ำแข็งจับบนอาหารแช่แข็งได้จริงไหม?',
    a: 'ได้ น้ำแข็งจับเกิดเมื่ออากาศในตู้แช่แข็งดูดความชื้นจากผิวอาหาร FreshLock ดูดอากาศออกจากถุงได้ถึง 95% ลดการสัมผัสออกซิเจนอย่างมาก ทำให้เนื้อสัตว์ ปลา ขนมปัง และผักสดได้นานเป็นเดือนแทนที่จะเป็นสัปดาห์',
  },
  {
    q: 'ซีลแกง น้ำพริก และเนื้อดองได้ไหม?',
    a: 'ได้ ด้วยถาดรองน้ำโปร่งแสงถอดได้ใต้หัวดูด กักเก็บของเหลวก่อนถึงมอเตอร์ ทำให้เนื้อดอง แกง น้ำพริก และอาหารที่มีน้ำซีลได้โดยไม่เลอะ สำหรับอาหารที่มีน้ำมากแนะนำให้แช่แข็งบางส่วนก่อน',
  },
  {
    q: 'ต้องซื้อถุง FreshLock เท่านั้นไหม?',
    a: 'ไม่ FreshLock ใช้ได้กับถุงสุญญากาศส่วนใหญ่ที่มีวาล์วอากาศทางเดียว (ฟิล์ม PA+PE 90 ไมโครเมตร) ถุงของเราเองก็ BPA-free และทดสอบแล้ว แต่คุณใช้ยี่ห้ออื่นได้',
  },
];

function QABlock() {
  return (
    <section className="py-20 bg-white" aria-labelledby="qa-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="qa-heading" className="section-title">คำตอบด่วน</h2>
          <p className="section-subtitle">3 คำถามที่ถูกถามบ่อยที่สุด</p>
        </header>
        <div className="space-y-6">
          {qaItems.map((item) => (
            <article key={item.q} className="bg-[#FFF8F0] rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary mb-2">{item.q}</h3>
              <p className="text-gray-600 leading-relaxed">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  const preview = faqs.slice(0, 4);
  return (
    <section className="py-20 bg-[#FFF8F0]" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="faq-heading" className="section-title">คำถามที่พบบ่อย</h2>
        </div>
        <div className="space-y-6">
          {preview.map((f) => (
            <details key={f.question} className="bg-white rounded-xl p-6 shadow-sm group">
              <summary className="font-semibold text-primary cursor-pointer list-none flex justify-between items-center">
                {f.question}
                <span className="ml-4 text-accent group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/faq" className="text-primary font-semibold hover:underline">ดูคำถามทั้งหมด →</Link>
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const recentPosts = getAllPosts().slice(0, 3);
  return (
    <section className="py-20 bg-white" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="blog-heading" className="section-title">คู่มือและเคล็ดลับ FreshLock</h2>
          <p className="section-subtitle">เทคนิคทำอาหารล่วงหน้า เก็บในตู้แช่แข็ง และซูวีดีจากครัวทดสอบของเรา</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#FFF8F0] rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="btn-secondary">ดูคู่มือทั้งหมด →</Link>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="py-20 bg-primary text-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          เลิกทิ้งอาหารดีๆ
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          จัดส่งฟรีเมื่อสั่งเกิน ${FREE_SHIPPING_THRESHOLD} · ชุดเริ่มต้นจัดส่งฟรี · คืนสินค้า 7 วัน · รับประกัน 1 ปี
        </p>
        <Link href="/products/freshlock-pro" className="btn-primary text-lg">
          ซื้อ FreshLock Pro — $69.99
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <FomoCountdownTimer variant="homepage" />
      <AboutFreshLock />
      <Features />
      <ProductShowcase />
      <SocialProof />
      <Reviews />
      <QABlock />
      <FaqPreview />
      <BlogPreview />
      <Cta />
    </>
  );
}
