import { Product, Review } from './types';

// Free shipping threshold for US orders (USD)
export const FREE_SHIPPING_THRESHOLD = 89;
export const SHIPPING_FEE_UNDER = 5.99;
// International free-shipping tiers
export const FREE_SHIPPING_REGIONS: Record<string, number> = {
  US: 89,
  CA: 89,
  GB: 89,
  JP: 89,
  AU: 69,
  NZ: 69,
  MY: 69,
  TH: 69,
};
export const STARTER_KIT_SHIPS_FREE = true; // Starter kits always ship free

export const products: Product[] = [
  {
    slug: 'freshlock-pro',
    name: 'FreshLock Pro Handheld Vacuum Sealer',
    price: 74.99,
    compareAtPrice: 89.99,
    discountBadge: '17% off MSRP',
    description:
      'The FreshLock Pro is a cordless handheld vacuum sealer designed to stop freezer burn before it starts. Attach the nozzle to the valve on any compatible embossed valve bag, press one button, and the quiet pump pulls air out in seconds — creating an airtight seal that keeps food fresh up to 5× longer. A detachable drip tray catches liquid overflow so soups, marinades, and juicy meats seal cleanly without damaging the motor. No heat bar, no complicated setup. Recharge via USB-C and take it anywhere — kitchen drawer, fridge, pantry, or campsite.',
    shortDescription:
      'Cordless handheld vacuum sealer with -60 kPa suction, detachable drip tray, USB-C charging, and BPA-free starter bags. Stops freezer burn — compatible with most embossed valve bags.',
    image: '/images/products/sealer-main.jpg',
    images: [
      '/images/products/sealer-main.jpg',
      '/images/products/sealer-angled.jpg',
      '/images/products/sealer-kit.jpg',
      '/images/products/sealer-box-angle.jpg',
      '/images/products/sealer-drain.jpg',
      '/images/products/sealer-detail-suction.jpg',
      '/images/products/sealer-detail-usbc.jpg',
      '/images/products/sealer-detail-cup.jpg',
      '/images/products/sealer-detail-tube.jpg',
    ],
    features: [
      '-60 kPa strong suction — pulls air through the bag valve in seconds',
      'Detachable drip tray with liquid backflow protection for soups, marinades, and juicy foods',
      'One-touch operation — no heat bar, no complicated settings',
      'Compatible with most embossed valve bags (not locked to our own bags)',
      'Cordless & portable — USB-C rechargeable, 80–100 seals per charge',
      'Quiet motor under 60 dB — about as loud as a library',
      'Compact, lightweight design (~210 g) — fits in a kitchen drawer',
    ],
    specs: {
      'Suction': '-60 kPa',
      'Battery': '1200 mAh rechargeable Li-ion',
      'Charging': 'USB-C, ~2.5 hours to full charge',
      'Seals per charge': '80–100 bags',
      'Noise level': 'Under 60 dB (library-quiet)',
      'Sealing method': 'Vacuum extraction through one-way air valve (no heat bar)',
      'Weight': '~210 g / 7.4 oz',
      'Dimensions (approx.)': '65 × 65 × 135 mm / 2.6 × 2.6 × 5.3 in',
      'Material': 'ABS body, BPA-free food-safe bags, food-grade silicone nozzle',
      'Operating temperature': '-20 °C to 100 °C (freezer, sous vide, microwave-safe bags — open zipper first)',
      'Drip tray': 'Detachable transparent drip cup, liquid backflow protection',
      'Bag compatibility': 'Compatible with most embossed valve bags (not locked to our own bags)',
      "What's in the box": '1 FreshLock Pro sealer, 1 USB-C charging cable, starter vacuum bags, user manual',
      'Warranty': '2-year warranty on the unit, 6-month on accessories',
    },
    category: 'devices',
    badge: 'New',
  },
  {
    slug: 'freshlock-starter-kit',
    name: 'FreshLock Starter Kit',
    price: 94.99,
    compareAtPrice: 104.97,
    discountBadge: 'Save $9.98 · Ships FREE',
    description:
      'Everything you need to start vacuum sealing today — the FreshLock Pro handheld vacuum sealer plus 30 BPA-free embossed valve bags in three sizes (10 small, 10 medium, 10 large), all in the retail box. Stop freezer burn on meal prep, leftovers, marinating meats, and sous-vide portions the moment you open the box. The sealer works with most embossed valve bags, so you are never locked into expensive replacements.',
    shortDescription:
      'FreshLock Pro + 30 BPA-free vacuum zipper bags in 3 sizes — everything to get started sealing today.',
    image: '/images/products/sealer-kit.jpg',
    images: [
      '/images/products/sealer-kit.jpg',
      '/images/products/sealer-box-angle.jpg',
      '/images/products/sealer-main.jpg',
      '/images/products/sealer-angled.jpg',
      '/images/products/sealer-drain.jpg',
      '/images/products/sealer-detail-suction.jpg',
      '/images/products/sealer-detail-usbc.jpg',
      '/images/products/sealer-detail-cup.jpg',
      '/images/products/sealer-detail-tube.jpg',
      '/images/products/bags-small.jpg',
      '/images/products/bags-med.jpg',
      '/images/products/bags-lrg.jpg',
    ],
    features: [
      'Includes FreshLock Pro handheld vacuum sealer (-60 kPa, USB-C, ~210 g)',
      '30 BPA-free embossed valve bags (10 small + 10 medium + 10 large)',
      'Detachable drip tray for mess-free sealing of liquids and marinades',
      'USB-C charging cable + quick-start guide included',
      'Works with most embossed valve bags — not locked to our own bags',
      'Comes in retail gift-ready box',
    ],
    specs: {
      'Includes': '1× FreshLock Pro sealer, 10× Small bags, 10× Medium bags, 10× Large bags, 1× USB-C cable, 1× quick-start guide',
      'Bag sizes': 'Small 22×21 cm, Medium 26×28 cm, Large 26×34 cm (90 μm embossed, white circular valve)',
      'Bag material': 'PA + PE multi-layer, BPA-free, embossed texture, reusable',
      'Sealer suction': '-60 kPa',
      'Sealer battery': '1200 mAh, USB-C charging (~2.5 hrs), 80–100 seals per charge',
      'Sealer weight': '~210 g / 7.4 oz',
      'Warranty': '2-year on sealer unit, 6-month on accessories; bags are reusable & recyclable',
    },
    category: 'kits',
    badge: 'Best Value',
  },
  {
    slug: 'vacuum-seal-bags-30-pack',
    name: 'Vacuum Seal Bags — 30 Pack (Medium)',
    price: 29.99,
    description:
      'Premium 90 μm embossed vacuum zipper bags with a white circular one-way air valve and apple-green zip slider. Attach any valve-type handheld sealer (including FreshLock Pro) to the valve, extract the air, and the bag creates an airtight barrier that locks out oxygen and moisture — stopping freezer burn on meat, cheese, vegetables, and dry goods. BPA-free, food-safe, freezer-safe, microwave-safe (with zipper open), and reusable.',
    shortDescription:
      '30 medium embossed valve bags (26×28 cm), 90 μm, BPA-free. Compatible with most valve-type handheld sealers.',
    image: '/images/products/bags-1.jpg',
    images: [
      '/images/products/bags-1.jpg',
      '/images/products/bags-2.jpg',
    ],
    features: [
      '90 μm embossed multi-layer PA+PE film for durability',
      'BPA-free & food-safe (FDA food-contact compliant)',
      'White circular one-way air valve + apple-green double-track zip slider',
      'Pre-cut size: 26 × 28 cm — ideal for portions, snacks, cheese, meal prep',
      'Compatible with most valve-type handheld vacuum sealers (not locked to one brand)',
      'Reusable & recyclable; freezer, fridge, sous-vide and microwave safe',
    ],
    specs: {
      'Quantity': '30 bags',
      'Size': '26 × 28 cm (Medium)',
      'Thickness': '90 μm embossed texture',
      'Material': 'PA + PE multi-layer, BPA-free, food-safe',
      'Closure': 'Double-track zipper with apple-green slider',
      'Valve': 'White circular one-way air valve',
      'Microwave safe': 'Yes (open zipper first, up to 100 °C)',
      'Freezer safe': 'Yes (-20 °C)',
      'Sous-vide safe': 'Yes (up to 100 °C)',
      'Dishwasher safe': 'Top-rack wash for reuse',
    },
    category: 'bags',
  },
  {
    slug: 'vacuum-seal-bags-50-pack',
    name: 'Vacuum Seal Bags — 50 Pack (Large)',
    price: 39.99,
    description:
      'Our value-sized large bag pack. At 26×34 cm these 90 μm embossed valve bags handle family-size portions, whole cuts of meat, bulk vegetables, and sous-vide cooking. Same premium multi-layer construction, white circular one-way air valve, and apple-green double-track zip slider as our medium bags. BPA-free, food-safe, reusable, and compatible with most valve-type handheld vacuum sealers.',
    shortDescription:
      '50 large embossed valve bags (26×34 cm), 90 μm, BPA-free. Great for family meals, bulk buys, and sous-vide.',
    image: '/images/products/bags-4.jpg',
    images: [
      '/images/products/bags-4.jpg',
      '/images/products/bags-5.jpg',
    ],
    features: [
      '90 μm embossed multi-layer PA+PE film for durability',
      'BPA-free & food-safe',
      'White circular one-way air valve + apple-green double-track zip slider',
      'Pre-cut size: 26 × 34 cm — family meals, bulk buys, sous-vide, large cuts',
      'Compatible with most valve-type handheld vacuum sealers',
      'Reusable & recyclable; freezer, fridge, sous-vide and microwave safe',
      'Best per-bag value',
    ],
    specs: {
      'Quantity': '50 bags',
      'Size': '26 × 34 cm (Large)',
      'Thickness': '90 μm embossed texture',
      'Material': 'PA + PE multi-layer, BPA-free, food-safe',
      'Closure': 'Double-track zipper with apple-green slider',
      'Valve': 'White circular one-way air valve',
      'Microwave safe': 'Yes (open zipper first, up to 100 °C)',
      'Freezer safe': 'Yes (-20 °C)',
      'Sous-vide safe': 'Yes (up to 100 °C)',
    },
    category: 'bags',
    badge: 'Value Pack',
  },
];

// Reviews — dates spread across ~60 days, mix of ratings, "Verified Buyer" label,
// at least one 4★ neutral review, and placeholder image reviews.
export const reviews: Review[] = [
  {
    name: 'Sarah M.',
    rating: 5,
    text:
      'Absolutely love my FreshLock Pro! I batch-cook on Sundays and the vacuum-sealed portions last so much longer in the fridge — and no more freezer burn on my ground beef. Game changer for meal prep.',
    date: '2026-06-22',
    verified: true,
    images: [],
  },
  {
    name: 'James T.',
    rating: 5,
    text:
      'Bought the Starter Kit as a gift for my wife and she uses it every single day. The one-touch pump is genuinely easy — even I can figure it out! Drip tray is a smart touch for marinating chicken.',
    date: '2026-06-10',
    verified: true,
    images: ['/images/reviews/review-james-1.jpg'],
  },
  {
    name: 'Priya K.',
    rating: 4,
    text:
      'Works great for sous-vide — the seal is solid every time and the 60 dB motor is quieter than I expected. Shipping took about 10 days to the US, which is a touch slow, but the product itself does exactly what it promises. Would recommend.',
    date: '2026-05-28',
    verified: true,
    images: [],
  },
  {
    name: 'Emma W.',
    rating: 5,
    text:
      'Our household food waste is down by at least half. The bags feel sturdy and the pump pulls a strong vacuum. Love that I can use other embossed valve bags too — no brand lock-in.',
    date: '2026-05-14',
    verified: true,
    images: ['/images/reviews/review-emma-1.jpg'],
  },
  {
    name: 'Michael R.',
    rating: 4,
    text:
      'Solid build quality and USB-C charging is really convenient. Battery lasts for weeks of normal use. Took off one star because the starter pack only has a few small bags — I ended up ordering the 50-pack separately.',
    date: '2026-05-02',
    verified: true,
    images: [],
  },
  {
    name: 'Linda C.',
    rating: 5,
    text:
      'Bought this for freezing soup portions and leftover sauces — the drip tray is the real unsung hero. No liquid getting sucked into the motor like my old sealer. 2-year warranty gave me confidence.',
    date: '2026-04-25',
    verified: true,
    images: ['/images/reviews/review-linda-1.jpg'],
  },
  {
    name: 'David P.',
    rating: 5,
    text:
      'Compact, light, charges fast via USB-C. Used it on a camping trip to seal marinated steaks — zero leaks in the cooler. Would buy again.',
    date: '2026-06-05',
    verified: true,
    images: [],
  },
];

export const faqs = [
  {
    question: 'How does the FreshLock Pro handheld vacuum sealer work?',
    answer:
      'Place your food in a compatible embossed valve bag, close the double-track apple-green zip slider, set the sealer nozzle over the white circular air valve, and press the one-touch button. The -60 kPa pump pulls air out through the valve in seconds, and the one-way valve locks automatically to maintain an airtight seal. No heat bar, no complicated prep — it is that simple.',
  },
  {
    question: 'Does it prevent freezer burn?',
    answer:
      'Yes. Freezer burn is caused by air reaching the food surface and dehydrating it. By removing up to 95% of the air from the bag, FreshLock dramatically slows oxidation and ice-crystal formation, keeping meat, fish, vegetables, and leftovers fresh-tasting for months in the freezer instead of weeks.',
  },
  {
    question: 'Can I seal liquids, soups, and marinades?',
    answer:
      'Yes. The FreshLock Pro has a detachable transparent drip tray (overflow cup) with liquid backflow protection that catches juices before they can reach the motor. For best results with soups and very wet foods, freeze them partially first or hold the bag upright while sealing.',
  },
  {
    question: 'Is it compatible with other brands of vacuum bags?',
    answer:
      'Yes. FreshLock works with most embossed valve bags that have a standard one-way air valve — you are not locked into our own bags. We recommend 90 μm (or thicker) embossed PA+PE bags with a white circular valve for best results. It is not compatible with open-top embossed bags designed for heat-bar edge sealers or chamber machines.',
  },
  {
    question: 'How long does the battery last and how do I charge it?',
    answer:
      'The built-in 1200 mAh Li-ion battery delivers 80–100 seals on a full charge, which is enough for multiple weeks of normal household use. It charges via USB-C (cable included) in about 2.5 hours — you can use any USB-C phone charger, power bank, or laptop port.',
  },
  {
    question: 'How loud is it?',
    answer:
      'The motor runs under 60 dB — about as loud as a library or normal conversation. It only runs for 5–10 seconds per bag, so you won\'t disturb anyone in the kitchen.',
  },
  {
    question: 'Are the bags BPA-free and food-safe?',
    answer:
      'Yes. All FreshLock bags are made from BPA-free, food-safe PA+PE multi-layer film. They are suitable for fridge, freezer, sous-vide (up to 100 °C), and microwave use (open the zipper first before microwaving).',
  },
  {
    question: 'What is the warranty?',
    answer:
      'FreshLock Pro comes with a 2-year warranty on the main unit and 6-month warranty on accessories (USB-C cable, starter bags). If anything goes wrong under normal use, contact support@freshlocksealer.com and we\'ll make it right.',
  },
  {
    question: 'What is your shipping policy?',
    answer:
      'Free standard shipping on US/CA/UK/JP orders over $89, and AU/NZ orders over $69. All Starter Kits ship free within US/CA/UK/JP regardless of subtotal. Orders under the free-shipping threshold pay a $5.99 flat rate (US) or live calculated rate (international). Orders are processed within 1–2 business days and delivered in 5–8 business days via DHL Express with full tracking. Tracking is included with every order.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 60-day satisfaction guarantee. If you are not completely happy with your FreshLock, contact us within 60 days of delivery for a refund or exchange. Return shipping is free for US orders on defective items.',
  },
];

// Review distribution helper (for UI star-bar rendering)
export const ratingDistribution = {
  5: 5,
  4: 2,
  3: 0,
  2: 0,
  1: 0,
};
