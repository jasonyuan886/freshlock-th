import type { Metadata } from 'next';
import CalculatorClient from './CalculatorClient';

export const metadata: Metadata = {
  title: 'Food Waste Calculator — Stop Wasting $1,866/Year',
  description:
    'USDA-backed calculator: see how much money you throw away on spoiled food and how fast FreshLock pays for itself. Vacuum sealing keeps food fresh up to 5× longer.',
  alternates: {
    canonical: '/food-waste-calculator',
  },
};

export default function FoodWasteCalculatorPage() {
  return <CalculatorClient />;
}
