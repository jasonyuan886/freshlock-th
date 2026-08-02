import type { Metadata } from 'next';
import SavingsCalculatorClient from './SavingsCalculatorClient';

export const metadata: Metadata = {
  title: 'Food Savings Calculator — See How Much FreshLock Saves You',
  description:
    'Free food waste savings calculator: enter your household size and weekly food spend, and see how much money a FreshLock vacuum sealer saves you per year, plus how fast it pays for itself.',
  alternates: { canonical: '/tools/savings-calculator' },
  openGraph: {
    title: 'Food Savings Calculator — See How Much FreshLock Saves You',
    description:
      'Find out how much money you throw away on spoiled food — and how fast a 9.99 FreshLock Starter Kit pays for itself.',
    type: 'website',
    url: '/tools/savings-calculator',
    images: [
      {
        url: '/images/products/sealer-main.jpg',
        width: 1200,
        height: 630,
        alt: 'FreshLock handheld vacuum sealer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food Savings Calculator — FreshLock',
    description:
      'See how much money vacuum sealing saves your household on wasted food.',
    images: ['/images/products/sealer-main.jpg'],
  },
};

export default function SavingsCalculatorPage() {
  return <SavingsCalculatorClient />;
}
