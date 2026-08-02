import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About FreshLock — Stop Freezer Burn with Our Handheld Vacuum Sealer',
  description:
    'FreshLock makes a cordless, one-touch handheld vacuum sealer designed to stop freezer burn and reduce food waste. -60 kPa, USB-C, BPA-free, 2-year warranty.',
  alternates: {
    canonical: '/about',
    languages: {
      'en-US': 'https://www.freshlocksealer.com/about',
      'ja-JP': 'https://jp.freshlocksealer.com/about',
      'x-default': 'https://www.freshlocksealer.com/about',
    },
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">About FreshLock</h1>
        <p className="section-subtitle">
          Helping households waste less food, save money, and eat fresher — one vacuum-sealed bag at a time.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            FreshLock started with a simple observation: too much good food goes to waste. From weeknight leftovers and bulk-cooked meals to seasonal produce and marinating meats, people were throwing away good food because it spoiled before they could enjoy it — even in the fridge or freezer, thanks to freezer burn.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Traditional vacuum sealers were bulky, corded, and relied on heat bars that burned bags and made the process intimidating. We set out to build something simpler: a compact, cordless, handheld vacuum pump that pairs with embossed valve bags. Just press the nozzle onto the valve, tap a button, and watch the air disappear in seconds — no heat, no fuss, no wasted bags.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today FreshLock is used by home cooks around the world — busy parents batch-cooking on weekends, campers keeping food fresh on the road, and anyone who wants their grocery dollar to stretch further.
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Designed in Shenzhen, Trusted Globally</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            FreshLock is designed, manufactured and shipped by <strong>Shichiri Technology Co., Ltd. (深圳市七力科技有限公司)</strong>, a kitchen appliance engineering team based in Shenzhen — the global hardware capital where supply chains, industrial designers and electronics engineers have built the tools people actually use every day for four decades.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We don't rent a fake US office or pretend to be a garage startup from California. We're a real factory operation: the same team that has produced kitchen appliances for well-known international brands now brings you FreshLock direct — no middleman markup, no "designed in Silicon Valley" marketing fluff. Just a well-built tool at a fair price.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">🏭 Company</p>
              <p className="text-gray-600">Shichiri Technology Co., Ltd.</p>
              <p className="text-gray-500 text-xs mt-1">深圳市七力科技有限公司</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">📍 Address</p>
              <p className="text-gray-600">3F, Building C, Anhongji Industrial Park, Chuangyi Road, Dalang Sub-district, Longhua District, Shenzhen, Guangdong, China</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">📧 Support</p>
              <p className="text-gray-600"><a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a></p>
              <p className="text-gray-500 text-xs mt-1">Replies within 24 business hours</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">✅ Certifications</p>
              <p className="text-gray-600">CE · RoHS · FCC · BPA-free (EU/US food-contact compliant)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Product</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The FreshLock Pro handheld vacuum sealer is built for real kitchens:
          </p>
          <ul className="space-y-2 text-gray-600 list-disc pl-6">
            <li><strong>Pearl-white body</strong> with a chrome diamond-cut cap, black semi-transparent panel with blue LED readout, and silver power button — sized to fit a kitchen drawer.</li>
            <li><strong>-60 kPa suction</strong> — powerful enough to pull a tight vacuum in seconds without damaging food.</li>
            <li><strong>Detachable transparent drip cup</strong> (liquid backflow protection) so soups, marinades and juicy proteins seal cleanly without damaging the motor.</li>
            <li><strong>USB-C rechargeable</strong> 1200 mAh battery — 80–100 seals per charge, ~2.5 hour charge time.</li>
            <li><strong>Under 60 dB</strong> — library-quiet operation.</li>
            <li>Compatible with <strong>most embossed valve bags</strong>, not just our own. Our bags are 90 μm embossed PA+PE, BPA-free, with a white circular air valve and apple-green zip slider.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            <em>FreshLock is a pump-style vacuum system — it does not use a heat bar or heat-sealing element. Air is extracted through the one-way valve on the bag, and the reusable double-track zip slider keeps the seal.</em>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '🌱', title: 'Reduce Food Waste', text: 'Vacuum sealing extends fridge, freezer and pantry life by up to 5× — saving groceries and money.' },
            { icon: '🌍', title: 'Free Shipping $89+', text: 'Free standard US/CA/UK/JP shipping over $89; AU/NZ/MY/TH free over $69; Starter Kits always ship free. International rates calculated at checkout.' },
            { icon: '♻️', title: 'Compatible & Reusable', text: 'Works with most embossed valve bags. Bags are washable and reusable for dry goods.' },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-primary mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Promise</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>60-day satisfaction guarantee</strong> — not happy, send it back for a full refund.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Free shipping</strong> on US/CA/UK/JP orders over $89 (AU/NZ over $69); Starter Kits always ship free.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>2-year warranty</strong> on the main unit, 6-month on accessories.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Real human support</strong> — email support@freshlocksealer.com anytime, replies within 24 hours on business days.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>BPA-free, FCC / CE / RoHS compliant</strong> — food-safe materials and certified electronics.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
