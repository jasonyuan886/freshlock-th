import type { Metadata } from 'next';
import Link from 'next/link';
import { faqs } from '@/lib/data';
import { generateFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'คำถามที่พบบ่อย — แบตเตอรี่ ถุง ฟรีเซอร์เบิร์น ถาดรองน้ำและการรับประกัน',
  description:
    'คำตอบเกี่ยวกับเครื่องสูญญากาศแบบพกพา FreshLock Pro: อายุแบตเตอรี่ การชาร์จ USB-C ถุงปลอด BPA ถาดรองน้ำสำหรับของเหลว การรับประกัน การคืนสินค้า 7 วันและการจัดส่ง',
  alternates: {
    canonical: '/faq',
    languages: {
      'en-US': 'https://www.freshlocksealer.com/faq',
      'ja-JP': 'https://jp.freshlocksealer.com/faq',
      'x-default': 'https://www.freshlocksealer.com/faq',
    },
  },
};

const faqSchema = generateFAQSchema(faqs);

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="section-title">คำถามที่พบบ่อย</h1>
          <p className="section-subtitle">
            ทุกสิ่งที่คุณต้องรู้เกี่ยวกับผลิตภัณฑ์ FreshLock การจัดส่ง และอื่นๆ
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.question} className="bg-white rounded-xl p-6 shadow-sm group">
              <summary className="font-semibold text-primary cursor-pointer list-none flex justify-between items-center">
                {f.question}
                <span className="ml-4 text-accent group-open:rotate-180 transition-transform text-xl" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">ยังมีคำถามอีกไหม?</h2>
          <p className="text-gray-300 mb-6">
            ทีมของเราพร้อมช่วยเหลือ ติดต่อเราแล้วเราจะตอบกลับภายใน 24 ชั่วโมง
          </p>
          <Link href="/contact" className="btn-primary">
            ติดต่อเรา
          </Link>
        </div>
      </div>
    </>
  );
}
