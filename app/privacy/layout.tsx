import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว — FreshLock จัดการข้อมูลของคุณอย่างไร',
  description:
    'FreshLock privacy policy: how we collect, use and protect your personal information when you shop for handheld vacuum sealers at freshlocksealer.com.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
