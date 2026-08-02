import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  const paymentMethods = [
    'PayPal', 'Visa', 'Mastercard', 'American Express', 'Discover',
  ];
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo-icon.png" alt="FreshLock" width={32} height={36} className="w-8 h-9" />
              <span className="text-xl font-bold">FreshLock</span>
            </div>
            <p className="text-gray-300 text-sm">
              Cordless handheld vacuum sealer designed to stop freezer burn, reduce food waste and keep meals fresh up to 5× longer.
            </p>
            <p className="text-gray-400 text-xs mt-3">
              🔒 Secure SSL Checkout · BPA-free · FCC / CE / RoHS compliant
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-gray-300 hover:text-white transition">All Products</Link></li>
              <li><Link href="/products?category=devices" className="text-gray-300 hover:text-white transition">Vacuum Sealers</Link></li>
              <li><Link href="/products?category=bags" className="text-gray-300 hover:text-white transition">Vacuum Bags</Link></li>
              <li><Link href="/products?category=kits" className="text-gray-300 hover:text-white transition">Kits & Bundles</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition">Blog</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition">Returns & Refunds</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition">Shipping Info</Link></li>
            </ul>
            <p className="text-gray-400 text-xs mt-3">support@freshlocksealer.com</p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition">Terms of Service</Link></li>
            </ul>
            <div className="mt-4 text-xs text-gray-300 space-y-1">
              <p>🚚 Free US shipping over $89</p>
              <p>🎁 Starter Kits Ship FREE</p>
              <p>↩️ 60-day returns</p>
              <p>🛡️ 2-year warranty (unit)</p>
            </div>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="max-w-md">
            <h3 className="font-semibold text-sm mb-1">📧 Join Our Newsletter</h3>
            <NewsletterForm />
          </div>
        </div>

        {/* Payment badges */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-400">We accept:</p>
              <span className="text-xs text-blue-300">🛡️ PayPal Buyer Protection</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {paymentMethods.map((m) => (
                <span
                  key={m}
                  className={
                    m === 'PayPal'
                      ? 'bg-[#ffc439] text-[#003087] text-xs px-2 py-1 rounded font-bold border border-[#ffc439]'
                      : 'bg-white/10 text-white text-xs px-2 py-1 rounded border border-white/20'
                  }
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p>&copy; {new Date().getFullYear()} FreshLock. All rights reserved.</p>
            <p className="text-xs text-gray-400">
              BPA-free · FCC / CE / RoHS · 2-Year Limited Warranty · Secure SSL Checkout
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
