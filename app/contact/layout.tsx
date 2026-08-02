import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact FreshLock — Support, Orders & Warranty Help',
  description:
    'Contact FreshLock customer support for questions about orders, shipping, 60-day returns, 2-year warranty or product use. We reply within 24 hours on business days.',
  alternates: { canonical: '/contact' },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
