'use client';

export default function FomoStockIndicator({ initialStock = 15 }: { initialStock?: number }) {
  // Simulate slight stock variation per visit
  const stock = typeof window !== 'undefined'
    ? Math.max(5, initialStock - (Math.floor(Math.random() * 4)))
    : initialStock;

  const isLow = stock <= 7;

  return (
    <div className={`flex items-center gap-2 mb-4 text-sm ${isLow ? 'text-red-600' : 'text-green-700'}`}>
      <span className={`inline-block w-2 h-2 rounded-full ${isLow ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
      <span className="font-semibold">
        {isLow ? `⚠️ Only ${stock} left in stock` : `✓ In stock (${stock} available)`}
      </span>
      {isLow && (
        <span className="text-xs text-gray-500">— order soon!</span>
      )}
    </div>
  );
}
