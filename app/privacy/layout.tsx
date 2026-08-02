import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — How FreshLock Handles Your Data',
  description:
    'FreshLock privacy policy: how we collect, use and protect your personal information when you shop for handheld vacuum sealers at freshlocksealer.com.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
