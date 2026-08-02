import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  const staticPages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/products', changefreq: 'weekly', priority: '0.9' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
    { loc: '/about', changefreq: 'monthly', priority: '0.6' },
    { loc: '/faq', changefreq: 'monthly', priority: '0.7' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
    { loc: '/shipping', changefreq: 'yearly', priority: '0.4' },
    { loc: '/returns', changefreq: 'yearly', priority: '0.4' },
    { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
  ];
  const productPages = [
    '/products/freshlock-pro',
    '/products/freshlock-starter-kit',
    '/products/vacuum-seal-bags-30-pack',
    '/products/vacuum-seal-bags-50-pack',
  ];

  const posts = getAllPosts();
  const blogUrls = posts.map(p => ({
    loc: `/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const urlEntry = (loc: string, changefreq: string, priority: string, lastmod?: string) => `
  <url>
    <loc>https://www.freshlocksealer.com${loc}</loc>
    <lastmod>${lastmod || today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

  const urls = [
    ...staticPages.map((p) => urlEntry(p.loc, p.changefreq, p.priority)),
    ...productPages.map((loc) => urlEntry(loc, 'monthly', '0.8')),
    ...blogUrls.map((p) => urlEntry(p.loc, p.changefreq, p.priority, p.lastmod)),
  ].join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
