'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">ติดต่อเรา</h1>
        <p className="section-subtitle">
          มีคำถาม? เรายินดีรับฟัง ทีมของเราจะตอบกลับภายใน 24 ชั่วโมง
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-primary mb-2">ส่งข้อความแล้ว!</h2>
              <p className="text-gray-500">ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็ว</p>
              <button
                onClick={() => { setStatus('idle'); setErrorMsg(''); }}
                className="mt-6 text-sm text-accent hover:underline"
              >
                ส่งข้อความใหม่
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ชื่อของคุณ</label>
                <input
                  id="name" name="name" type="text" required maxLength={100}
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่อีเมล</label>
                <input
                  id="email" name="email" type="email" required maxLength={200}
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">หัวข้อ</label>
                <select
                  id="subject" name="subject" required
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                >
                  <option>สอบถามทั่วไป</option>
                  <option>สนับสนุนคำสั่งซื้อ</option>
                  <option>การคืนสินค้าและคืนเงิน</option>
                  <option>สอบถามผลิตภัณฑ์</option>
                  <option>ขายส่ง / ธุรกิจ</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">ข้อความ</label>
                <textarea
                  id="message" name="message" required rows={5} maxLength={5000}
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {errorMsg || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง'}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'กำลังส่ง…' : 'ส่งข้อความ'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">ติดต่อกับเรา</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium">อีเมล</p>
                  <p className="text-gray-600">support@freshlocksealer.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="font-medium">เวลาตอบกลับ</p>
                  <p className="text-gray-600">ภายใน 24 ชั่วโมง จันทร์–อาทิตย์<br />ให้ความสำคัญกับชั่วโมงทำการ JST/AEST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <p className="font-medium">ร้านค้าออนไลน์</p>
                  <p className="text-gray-600">
                    FreshLock เป็นร้านค้าออนไลน์เท่านั้น<br />
                    เราจัดส่งทั่วโลกจากศูนย์จัดส่งของเรา<br />
                    ไม่มีหน้าร้านจริง
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF8F0] rounded-xl p-6">
            <h3 className="font-bold text-primary mb-2">ลิงก์ด่วน</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="text-accent hover:underline">คำถามที่พบบ่อย</a></li>
              <li><a href="/returns" className="text-accent hover:underline">นโยบายการคืนสินค้าและคืนเงิน</a></li>
              <li><a href="/shipping" className="text-accent hover:underline">ข้อมูลการจัดส่ง</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
