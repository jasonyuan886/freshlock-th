import type { Metadata } from 'next';
import { products } from '@/lib/data';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'ซื้อเครื่องสูญญากาศแบบพกพาและถุงปลอด BPA',
  description:
    'ซื้อเครื่องสูญญากาศแบบพกพา FreshLock Pro คิทเริ่มต้น และถุงซีลสูญญากาศลายนูนปลอด BPA -60 kPa, ชาร์จ USB-C, ถาดรองน้ำ, ใช้ได้กับถุงวาล์วส่วนใหญ่ จัดส่งฟรีเมื่อสั่งเกิน $69',
  alternates: {
    canonical: '/products',
    languages: {
      'en-US': 'https://www.freshlocksealer.com/products',
      'ja-JP': 'https://jp.freshlocksealer.com/products',
      'x-default': 'https://www.freshlocksealer.com/products',
    },
  },
};

const itemListSchema = {
  '@context': 'https://schema.org/',
  '@type': 'ItemList',
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://www.freshlocksealer.com/products/${p.slug}`,
    name: p.name,
    image: `https://www.freshlocksealer.com${p.image}`,
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ProductsClient />
    </>
  );
}
