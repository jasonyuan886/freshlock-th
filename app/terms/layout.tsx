import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ข้อตกลงการใช้บริการ — เครื่องซีลสูญญากาศแบบพกพา FreshLock',
  description:
    'Terms of Service for freshlocksealer.com: orders, payments, shipping, 60-day returns, 2-year warranty, intellectual property and liability terms.',
  alternates: { canonical: '/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
