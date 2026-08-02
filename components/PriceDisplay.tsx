type Props = {
  price: number;
  compareAtPrice?: number;
  discountBadge?: string;
  size?: 'sm' | 'md' | 'lg';
  showCurrencyLabel?: boolean;
  align?: 'left' | 'center';
};

export default function PriceDisplay({
  price,
  compareAtPrice,
  discountBadge,
  size = 'md',
  showCurrencyLabel = true,
  align = 'left',
}: Props) {
  const hasDiscount = typeof compareAtPrice === 'number' && compareAtPrice > price;
  const savings = hasDiscount ? compareAtPrice! - price : 0;

  const priceClass =
    size === 'lg' ? 'text-3xl md:text-4xl font-bold text-accent'
    : size === 'sm' ? 'text-xl font-bold text-accent'
    : 'text-2xl font-bold text-accent';

  const strikeClass =
    size === 'lg' ? 'text-lg text-gray-400 line-through mr-2'
    : size === 'sm' ? 'text-sm text-gray-400 line-through mr-2'
    : 'text-base text-gray-400 line-through mr-2';

  const badgeText =
    discountBadge || (hasDiscount ? `ประหยัด ฿${savings.toLocaleString()}` : '');

  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <div className="flex items-baseline flex-wrap gap-2">
        {hasDiscount && (
          <span className={strikeClass}>฿{compareAtPrice!.toLocaleString()}</span>
        )}
        <span className={priceClass}>฿{price.toLocaleString()}</span>
        {showCurrencyLabel && (
          <span className="text-sm text-gray-400 font-normal">THB</span>
        )}
      </div>
      {badgeText && (
        <span className={`inline-block mt-1 bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full border border-red-200 ${align === 'center' ? '' : ''}`}>
          {badgeText}
        </span>
      )}
    </div>
  );
}
