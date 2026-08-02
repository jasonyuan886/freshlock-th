import Link from 'next/link';
import { products, reviews, faqs, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import PriceDisplay from '@/components/PriceDisplay';
import FomoCountdownTimer from '@/components/FomoCountdownTimer';
import { getAllPosts } from '@/lib/blog';
import { generateFAQSchema } from '@/lib/schema';
import Image from 'next/image';

const faqSchema = generateFAQSchema(faqs.slice(0, 3));

function StarRating({ rating }: { rating: number }) {
  return (
    <span aria-label={`Rated ${rating} out of 5`}>
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
              💧 Vacuum-seal soups & marinades — without killing the motor
            </span>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              FreshLock Pro<br />
              <span className="text-accent">Handheld Vacuum Sealer</span>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-lg">
              The only cordless handheld sealer with a{' '}
              <strong>mechanical drip-drain cup</strong> that catches soups, marinades
              and juicy drips <em>before</em> they hit the motor. No clogged pumps,
              no burnt units — just -60 kPa one-touch vacuum that keeps food fresh{' '}
              <strong>5× longer</strong>. USB-C rechargeable, works with{' '}
              <strong>most embossed valve bags</strong> (not just ours).
            </p>
            <div className="flex flex-wrap gap-2 mb-8 text-sm">
              {[
                '💧 Mechanical drain cup (soups/marinades safe)',
                '🔌 USB-C · 80-100 seals/charge',
                '🔇 Under 60 dB',
                '♻️ Works with most valve bags',
                '🛡️ 2-year warranty',
              ].map((b) => (
                <span key={b} className="bg-white/10 text-white text-xs px-2.5 py-1 rounded-full border border-white/20">
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products/freshlock-pro" className="btn-primary text-lg">
                Shop FreshLock Pro — $74.99
              </Link>
              <Link href="#features" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
                See Features
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
              <span>🚚 Free US shipping over ${FREE_SHIPPING_THRESHOLD}</span>
              <span>↩️ 60-day returns</span>
              <span>🔒 Secure SSL checkout</span>
            </div>
          </div>
          <div className="flex justify-center md:justify-center mt-8 md:mt-0">
            <Image src="/images/products/sealer-main.jpg"
              alt="FreshLock Pro handheld vacuum sealer in pearl white with chrome diamond-cut cap, black semi-transparent LED panel and detachable drip tray, shown with apple-green zip-slider embossed vacuum bags"
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
          <h2 id="about-heading" className="section-title">Built for Real Kitchens</h2>
        </header>
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
          <p>
            <strong>FreshLock</strong> is a cordless handheld vacuum sealer designed for people who love food and hate waste. Whether you are meal prepping on Sundays, portioning baby food, marinating meat for the grill, or packing snacks for a camping trip, FreshLock pulls a strong -60 kPa vacuum in seconds.
          </p>
          <p>
            Unlike bulky countertop sealers, the FreshLock Pro works on reusable embossed zipper bags fitted with a one-way air valve — <strong>no heat bar, no learning curve</strong>. A <strong>detachable transparent drip cup</strong> catches liquid overflow so soups, marinades, and juicy proteins seal cleanly, and the motor stays dry.
          </p>
          <p>
            It is <strong>compatible with most embossed valve bags</strong> on the market, not just our own. Recharge via any USB-C cable, pull 80–100 seals per charge, and rest easy with a 2-year warranty on the unit.
          </p>
        </article>
      </div>
    </section>
  );
}

const featureList = [
  {
    icon: '🧊',
    title: 'Stops Freezer Burn',
    text: 'Removes up to 95% of air, preventing ice crystals and oxidation. Meat, fish, and produce stay fresh-tasting months longer.',
  },
  {
    icon: '💧',
    title: 'Drip Tray for Liquids',
    text: 'Detachable transparent cup catches soups, marinades and juicy drips before they reach the motor. Dishwasher-safe.',
  },
  {
    icon: '👆',
    title: 'One-Touch Simple',
    text: 'Place the nozzle over the valve, press once, and the pump auto-stops when the bag is tight. No heat bar, no settings.',
  },
  {
    icon: '🔌',
    title: 'USB-C Rechargeable',
    text: '1200 mAh battery, ~2.5 hr charge, 80–100 seals per charge. Works with any USB-C cable or power bank.',
  },
  {
    icon: '🔇',
    title: 'Library-Quiet',
    text: 'Under 60 dB during operation — quiet enough for early mornings, late-night meal prep, or open-plan kitchens.',
  },
  {
    icon: '♻️',
    title: 'Works With Most Valve Bags',
    text: 'Compatible with most embossed valve bags — no brand lock-in. BPA-free PA+PE bags recommended.',
  },
  {
    icon: '⚖️',
    title: 'Lightweight & Compact',
    text: 'Weighs only ~210 g (7.4 oz). Fits in a kitchen drawer, backpack or cooler for camping and BBQ.',
  },
  {
    icon: '🛡️',
    title: '2-Year Warranty',
    text: '2-year warranty on the sealer unit, 6-month on accessories. We stand behind every pump we ship.',
  },
];

function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="features-heading" className="section-title">Why FreshLock?</h2>
          <p className="section-subtitle">
            The features home cooks actually care about — not marketing fluff.
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
          <h2 id="products-heading" className="section-title">Our Products</h2>
          <p className="section-subtitle">
            Start with the sealer or grab the complete kit — everything ships fast.
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
          <Link href="/products" className="btn-secondary">View All Products</Link>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-12 bg-primary text-white" aria-label="Social proof stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['4.6 ★', 'Average Rating'],
            ['-60 kPa', 'Strong Suction'],
            ['Free', `Shipping over $${FREE_SHIPPING_THRESHOLD}`],
            ['60-Day', 'Money-Back Returns'],
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
    <section className="py-20 bg-gray-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="reviews-heading" className="section-title">What Verified Buyers Say</h2>
          <p className="section-subtitle">
            Real reviews from real customers — including a few 4-star notes to keep us honest.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topReviews.map((r) => (
            <article key={r.name} className="bg-white rounded-xl p-5 shadow-sm" itemScope itemType="https://schema.org/Review">
              <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Product">
                <meta itemProp="name" content="FreshLock Pro Handheld Vacuum Sealer" />
              </div>
              <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={String(r.rating)} />
                <meta itemProp="bestRating" content="5" />
                <meta itemProp="worstRating" content="1" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-accent text-sm" aria-label={`Rated ${r.rating} out of 5`}>
                  <StarRating rating={r.rating} />
                </div>
                {r.verified && (
                  <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    ✓ Verified Buyer
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-3 text-sm italic line-clamp-5" itemProp="reviewBody">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <p className="font-semibold text-primary" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{r.name}</span>
                </p>
                <time dateTime={r.date}>
                  {new Date(r.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </time>
              </div>
              {r.images && r.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {r.images.map((src, i) => (
                    <div key={i} className="w-14 h-14 rounded overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center text-[9px] text-gray-400">
                      📷 photo
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/products/freshlock-pro#reviews" className="btn-secondary">Read All Reviews</Link>
          <a
            href="mailto:freshlocksealer@gmail.com?subject=FreshLock%20Review"
            className="text-primary font-semibold hover:underline text-sm"
          >
            ✍️ Write a Review
          </a>
        </div>
      </div>
    </section>
  );
}

const qaItems = [
  {
    q: 'Does it really stop freezer burn?',
    a: 'Yes. Freezer burn happens when dry freezer air dehydrates the food surface. FreshLock removes up to 95% of the air from the bag, cutting oxygen exposure dramatically so meat, fish, bread, and produce stay fresh-tasting for months instead of weeks.',
  },
  {
    q: 'Can I seal soups and marinades?',
    a: 'Yes, thanks to the detachable transparent drip cup under the nozzle. It catches liquid overflow before it can reach the motor, so marinated meats, stew portions, and even leftover soups seal without mess. For very wet foods we recommend partial freezing first.',
  },
  {
    q: 'Am I locked into buying special FreshLock bags?',
    a: 'No. FreshLock works with most embossed valve bags (90 μm PA+PE film with a standard one-way air valve). Our own bags are BPA-free and tested to match, but you can use any compatible brand.',
  },
];

function QABlock() {
  return (
    <section className="py-20 bg-white" aria-labelledby="qa-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="qa-heading" className="section-title">Quick Answers</h2>
          <p className="section-subtitle">The three questions we get asked most often.</p>
        </header>
        <div className="space-y-6">
          {qaItems.map((item) => (
            <article key={item.q} className="bg-gray-50 rounded-xl p-6">
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
    <section className="py-20 bg-gray-50" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
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
          <Link href="/faq" className="text-primary font-semibold hover:underline">View all FAQs →</Link>
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
          <h2 id="blog-heading" className="section-title">FreshLock Guides & Tips</h2>
          <p className="section-subtitle">Meal prep, freezer storage and sous-vide tips from our test kitchen.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-gray-50 rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="btn-secondary">View All Guides →</Link>
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
          Stop Throwing Away Good Food
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Free shipping over ${FREE_SHIPPING_THRESHOLD} · Starter Kits ship free · 60-day returns · 2-year warranty
        </p>
        <Link href="/products/freshlock-pro" className="btn-primary text-lg">
          Get FreshLock Pro — $74.99
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
