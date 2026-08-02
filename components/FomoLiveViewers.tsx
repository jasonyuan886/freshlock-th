'use client';

import { useEffect, useState } from 'react';

export default function FomoLiveViewers() {
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Initial random 8-23
    setViewers(8 + Math.floor(Math.random() * 16));

    // Update every 20-40s with slight variation
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = Math.max(6, Math.min(28, prev + delta));
        return next;
      });
    }, 20000 + Math.random() * 20000);

    return () => clearInterval(interval);
  }, []);

  if (!viewers) return null;

  return (
    <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-500">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="font-medium text-gray-600">
        🔥 {viewers} {viewers === 1 ? 'person is' : 'people are'} viewing this product right now
      </span>
    </div>
  );
}
