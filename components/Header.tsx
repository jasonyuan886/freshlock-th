use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="FreshLock — เครื่องซีลสูญญากาศแบบพกพา" className="h-10 w-auto" width={240} height={60} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary transition">
              สินค้า
            </Link>
            <Link href="/food-waste-calculator" className="text-accent hover:text-accent/80 font-semibold transition">
              💰 ประหยัด $1,866
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition">
              บล็อก
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition">
              เกี่ยวกับเรา
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-primary transition">
              คำถามที่พบบ่อย
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition">
              ติดต่อเรา
            </Link>
            <Link href="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-primary transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              สินค้า
            </Link>
            <Link
              href="/food-waste-calculator"
              className="block py-2 text-accent font-semibold hover:text-accent/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              💰 ประหยัด $1,866/ปี
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              บล็อก
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/faq"
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              คำถามที่พบบ่อย
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              ติดต่อเรา
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
