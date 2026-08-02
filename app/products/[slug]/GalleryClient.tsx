'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GalleryClient({
  images,
  name,
  shortDescription,
}: {
  images: string[];
  name: string;
  shortDescription: string;
}) {
  const allImages = images && images.length > 0 ? images : [];
  const [active, setActive] = useState(0);
  if (allImages.length === 0) return null;

  return (
    <section>
      <div className="rounded-xl overflow-hidden bg-stone-50 shadow mb-4 relative flex items-center justify-center" style={{ minHeight: 'min(80vw, 560px)' }}>
        <Image
          src={allImages[active]}
          alt={`${name} — ${shortDescription}`}
          className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
          itemProp="image"
          width={1200}
          height={1600}
          priority
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-3 flex-wrap" role="list" aria-label="Product images">
          {allImages.map((img, i) => (
            <button
              key={i}
              type="button"
              role="listitem"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${allImages.length}`}
              aria-pressed={active === i}
              className={`rounded-lg overflow-hidden border-2 transition ${
                active === i ? 'border-accent ring-2 ring-accent/30' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={img}
                alt={`${name} — view ${i + 1}`}
                className="w-20 h-20 object-cover"
                loading="lazy"
                width={80}
                height={80}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
