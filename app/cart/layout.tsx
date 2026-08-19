import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://th.freshlocksealer.com/cart' },
  title: 'ตะกร้าสินค้า',
  description:
    'Review your FreshLock cart before checkout. Free shipping over $89, Starter Kits ship free, 60-day returns, and a 2-year warranty on every sealer.',
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
