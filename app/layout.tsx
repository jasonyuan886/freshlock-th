import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FomoPurchaseNotification from '@/components/FomoPurchaseNotification';
import { CartProvider } from '@/lib/cart-context';
import { generateOrganizationSchema, generateWebsiteSchema, SITE_URL } from '@/lib/schema';

const siteName = 'FreshLock';
const title = 'FreshLock Pro เครื่องซีลสูญญากาศแบบพกพา — ยืดอายุอาหาร 5 เท่า';
const description =
  'เครื่องซีลสูญญากาศแบบพกพา FreshLock Pro สุญญากาศ -60 kPa ชาร์จ USB-C 80-100 ครั้งต่อการชาร์จ ถุง BPA-free จัดส่ง DHL 2-3 วัน รับประกัน 1 ปี คืนสินค้า 7 วัน';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords:
    'เครื่องซีลสูญญากาศ, เครื่องซีลอาหาร, เครื่องซีลแบบพกพา, ถุงเก็บอาหาร, ยืดอายุอาหาร, สุญญากาศ, FreshLock, vacuum sealer, ซีลสูญญากาศ',
  applicationName: siteName,
  icons: {
    icon: '/favicon-32.png',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    languages: {
      'en-US': 'https://www.freshlocksealer.com',
      'ja-JP': 'https://jp.freshlocksealer.com',
      'th-TH': 'https://th.freshlocksealer.com',
      'x-default': 'https://www.freshlocksealer.com',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName,
    title,
    description,
    locale: 'th_TH',
    images: [
      {
        url: '/images/products/sealer-main.jpg',
        width: 1200,
        height: 630,
        alt: 'FreshLock Pro เครื่องซีลสูญญากาศแบบพกพา สีขาวกับถุงสุญญากาศสีเขียว',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/products/sealer-main.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 's5k1bV4GOf6JitkZAj0KewRM2B2TgAO5N_6aDIZ59cM',
  },
};

const orgSchema = generateOrganizationSchema();
const websiteSchema = generateWebsiteSchema();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="alternate" hrefLang="en-US" href="https://www.freshlocksealer.com" />
        <link rel="alternate" hrefLang="ja-JP" href="https://jp.freshlocksealer.com" />
        <link rel="alternate" hrefLang="th-TH" href="https://th.freshlocksealer.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.freshlocksealer.com" />
        <meta name="p:domain_verify" content="35f8877a03378002c70a19e5750a86c4" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-N16R0F2B1Y" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N16R0F2B1Y');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FomoPurchaseNotification />
        </CartProvider>
      </body>
    </html>
  );
}
