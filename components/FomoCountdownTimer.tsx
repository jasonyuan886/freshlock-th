'use client';

import { useEffect, useState } from 'react';

const COUNTDOWN_HOURS = 72;
const STORAGE_KEY = 'freshlock_countdown_start';

function getTimeLeft(): { hours: number; minutes: number; seconds: number; total: number } | null {
  if (typeof window === 'undefined') return null;

  let startTime = localStorage.getItem(STORAGE_KEY);
  if (!startTime) {
    startTime = Date.now().toString();
    localStorage.setItem(STORAGE_KEY, startTime);
  }

  const elapsed = Date.now() - parseInt(startTime);
  const totalMs = COUNTDOWN_HOURS * 60 * 60 * 1000 - elapsed;

  if (totalMs <= 0) {
    // Reset cycle
    startTime = Date.now().toString();
    localStorage.setItem(STORAGE_KEY, startTime);
    return { hours: COUNTDOWN_HOURS, minutes: 0, seconds: 0, total: COUNTDOWN_HOURS * 3600 };
  }

  const total = Math.floor(totalMs / 1000);
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    total,
  };
}

export default function FomoCountdownTimer({ variant = 'homepage' }: { variant?: 'homepage' | 'pdp' }) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (variant === 'pdp') {
    return (
      <div className="mb-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="text-sm">
          <span className="font-bold text-red-600">⚡ Launch Special</span>
          <span className="text-gray-600 ml-1">ลด 15% สิ้นสุดใน</span>
        </div>
        <div className="flex items-center gap-1 font-mono font-bold text-red-600 text-lg tabular-nums">
          <span className="bg-white px-2 py-0.5 rounded">{pad(timeLeft.hours)}h</span>
          <span className="bg-white px-2 py-0.5 rounded">{pad(timeLeft.minutes)}m</span>
          <span className="bg-white px-2 py-0.5 rounded">{pad(timeLeft.seconds)}s</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap">
        <span className="font-bold text-sm md:text-base">⚡ โปรโมชั่นเปิดตัว — 15% OFF Everything!</span>
        <div className="flex items-center gap-1.5 font-mono font-bold text-lg tabular-nums">
          <span className="bg-white/20 px-2 py-0.5 rounded">{pad(timeLeft.hours)}h</span>
          <span className="bg-white/20 px-2 py-0.5 rounded">{pad(timeLeft.minutes)}m</span>
          <span className="bg-white/20 px-2 py-0.5 rounded">{pad(timeLeft.seconds)}s</span>
        </div>
      </div>
    </div>
  );
}
