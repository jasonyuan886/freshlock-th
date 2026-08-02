import type { Metadata } from 'next';
import CalculatorClient from './CalculatorClient';

export const metadata: Metadata = {
  title: 'เครื่องคำนวณการสูญเสียอาหาร — หยุดทิ้งเงินปีละ $1,866',
  description:
    'เครื่องคำนวณจาก USDA: ดูว่าคุณทิ้งเงินไปกับอาหารที่เสียไปเท่าไร และ FreshLockคุ้มทุนเร็วแค่ไหน การสูญญากาศทำให้อาหารสดนานขึ้นถึง 5 เท่า',
  alternates: {
    canonical: '/food-waste-calculator',
  },
};

export default function FoodWasteCalculatorPage() {
  return <CalculatorClient />;
}
