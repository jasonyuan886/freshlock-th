'use client';

import { useEffect, useState, useRef } from 'react';

const templates = [
  { country: 'United States', flag: '🇺🇸', product: 'FreshLock Starter Kit', minutes: 2 },
  { country: 'United Kingdom', flag: '🇬🇧', product: 'FreshLock Pro', minutes: 5 },
  { country: 'Canada', flag: '🇨🇦', product: 'FreshLock Starter Kit', minutes: 8 },
  { country: 'Australia', flag: '🇦🇺', product: 'Vacuum Seal Bags 30-Pack', minutes: 3 },
  { country: 'Germany', flag: '🇩🇪', product: 'FreshLock Pro', minutes: 11 },
  { country: 'France', flag: '🇫🇷', product: 'FreshLock Starter Kit', minutes: 6 },
  { country: 'Japan', flag: '🇯🇵', product: 'FreshLock Pro', minutes: 14 },
  { country: 'Singapore', flag: '🇸🇬', product: 'Vacuum Seal Bags 50-Pack', minutes: 4 },
  { country: 'Netherlands', flag: '🇳🇱', product: 'FreshLock Starter Kit', minutes: 9 },
  { country: 'Sweden', flag: '🇸🇪', product: 'FreshLock Pro', minutes: 7 },
  { country: 'Ireland', flag: '🇮🇪', product: 'Vacuum Seal Bags 30-Pack', minutes: 12 },
  { country: 'New Zealand', flag: '🇳🇿', product: 'FreshLock Starter Kit', minutes: 5 },
];

export default function FomoPurchaseNotification() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<(typeof templates)[0] | null>(null);
  const [closed, setClosed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (closed) return;

    const showNotification = () => {
      const random = templates[Math.floor(Math.random() * templates.length)];
      setCurrent(random);
      setVisible(true);

      // Auto-hide after 5 seconds
      timerRef.current = setTimeout(() => {
        setVisible(false);
        // Schedule next notification in 30-60s
        timerRef.current = setTimeout(showNotification, 30000 + Math.random() * 30000);
      }, 5000);
    };

    // First notification after 8-15s
    const initialTimer = setTimeout(showNotification, 8000 + Math.random() * 7000);
    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [closed]);

  if (closed || !current) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-xs transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{current.flag}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800 leading-snug">
            Someone in <strong>{current.country}</strong> just bought{' '}
            <strong className="text-primary">{current.product}</strong>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {current.minutes} minute{current.minutes !== 1 ? 's' : ''} ที่แล้ว · Based on recent order patterns
          </p>
        </div>
        <button
          onClick={() => setClosed(true)}
          className="text-gray-300 hover:text-gray-500 flex-shrink-0 -mt-1 -mr-1"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
