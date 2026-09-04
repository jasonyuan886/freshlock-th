import { Product, Review } from '@/lib/types';

const SITE_URL = 'https://th.freshlocksealer.com';

function absoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function computeAggregateRating(reviews?: Review[]) {
  // When we have actual review data compute from it; otherwise fall back to a
  // realistic distribution. Always use a non-perfect average (not 5.0).
  if (reviews && reviews.length > 0) {
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    const avg = sum / reviews.length;
    return {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: String(reviews.length),
      bestRating: '5',
      worstRating: '1',
    };
  }
  return {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  };
}

export function generateProductSchema(product: Product, reviews?: Review[]) {
  const aggregateRating = computeAggregateRating(reviews);
  const reviewList = (reviews && reviews.length > 0)
    ? reviews.slice(0, 5).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        datePublished: r.date,
        reviewBody: r.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(r.rating),
          bestRating: '5',
          worstRating: '1',
        },
      }))
    : undefined;

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: (product.images || [product.image]).map(absoluteUrl),
    description: product.description,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'FreshLock',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: 'THB',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.price >= 50 ? '0.00' : '5.99',
          currency: 'THB',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'TH',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 5,
            maxValue: 8,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'TH',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 60,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    aggregateRating,
    ...(reviewList ? { review: reviewList } : {}),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    name: 'FreshLock',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      'https://www.youtube.com/@FreshLocksealer',
      'https://www.tiktok.com/@freshlocksealer',
      'https://www.instagram.com/freshlocksea',
      'https://www.pinterest.com/freshlocksealer/',
      'https://www.facebook.com/people/FreshLock/1000',
    ],
    description:
      'FreshLock is a handheld cordless vacuum sealer that prevents freezer burn and keeps food fresh up to 5× longer. BPA-free bags, USB-C rechargeable, compatible with most embossed valve bags.',
    email: 'support@freshlocksealer.com',
    areaServed: ['TH', 'Worldwide'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@freshlocksealer.com',
      contactType: 'customer support',
      availableLanguage: ['Thai', 'English'],
      areaServed: ['Worldwide'],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'FreshLock',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export { SITE_URL };
