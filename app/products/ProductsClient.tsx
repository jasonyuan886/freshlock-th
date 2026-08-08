'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products } from '@/lib/data';
import Image from 'next/image';
import PriceDisplay from '@/components/PriceDisplay';

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'devices', label: 'Sealers' },
  { value: 'bags', label: 'Vacuum Bags' },
  { value: 'kits', label: 'Kits & Bundles' },
];

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name', label: 'Name: A → Z' },
];

export default function ProductsPage() {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let list = category === 'all' ? [...products] : products.filter((p) => p.category === category);
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="section-title">Our Products</h1>
        <p className="section-subtitle">
          Everything you need to seal in freshness and reduce food waste.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === c.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm bg-white"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
          >
            <div className="relative overflow-hidden">
              <Image src={p.image}
                alt={`${p.name} — ${p.shortDescription}`}
                className="w-full aspect-square object-contain bg-stone-50 group-hover:scale-105 transition duration-300"
                loading="lazy"
                width={400}
                height={400}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              {p.badge && (
                <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  {p.badge}
                </span>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-primary mb-2">{p.name}</h2>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.shortDescription}</p>
              <div className="flex justify-between items-end">
                <PriceDisplay
                  price={p.price}
                  compareAtPrice={p.compareAtPrice}
                  discountBadge={p.discountBadge}
                  size="sm"
                  showCurrencyLabel={false}
                />
                <span className="text-sm text-gray-400">THB</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">No products found in this category.</p>
      )}
    </div>
  );
}
