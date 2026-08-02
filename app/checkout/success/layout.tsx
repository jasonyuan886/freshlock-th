import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed — Thank You',
  description: 'Your FreshLock order has been placed. Check your email for order confirmation and tracking details.',
  robots: { index: false, follow: false },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
