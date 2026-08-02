'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data.error || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
      }
    } catch {
      setStatus('error');
      setErrorMsg('เกิดข้อผิดพลาดเครือข่าย กรุณาลองอีกครั้ง');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-4">
        <p className="text-sm text-green-300 font-medium">
          ✓ สมัครสำเร็จ! กรุณาตรวจสอบอีเมลของคุณ
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-300 mb-1">
        หยุดทิ้งอาหาร เริ่มประหยัดเงิน
      </p>
      <p className="text-xs text-green-300/80 mb-2">
        เข้าร่วม 500+ ครัวเรือนอัจฉริยะ · เคล็ดลับ และข้อเสนอพิเศษ
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-3 py-2 rounded text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'loading' ? 'กำลังสมัคร...' : 'สมัครรับข่าว'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-xs text-red-300 mt-1">{errorMsg}</p>
      )}
    </div>
  );
}
