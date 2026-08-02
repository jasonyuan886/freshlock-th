import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — FreshLock Handheld Vacuum Sealers',
  description:
    'Terms of Service for freshlocksealer.com: orders, payments, shipping, 60-day returns, 2-year warranty, intellectual property and liability terms.',
  alternates: { canonical: '/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
