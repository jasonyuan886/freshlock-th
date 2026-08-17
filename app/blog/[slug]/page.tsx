import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} `,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        'en-US': `https://www.freshlocksealer.com/blog/${slug}`,
        'ja-JP': `https://jp.freshlocksealer.com/blog/${slug}`,
        'th-TH': `https://th.freshlocksealer.com/blog/${slug}`,
        'x-default': `https://th.freshlocksealer.com/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'FreshLock',
      url: 'https://www.freshlocksealer.com',
    },
    mainEntityOfPage: `https://www.freshlocksealer.com/blog/${slug}`,
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link href="/blog" className="text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center mb-6">
          ← กลับสู่บทความทั้งหมด
        </Link>
        <header className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-AU', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.tags.length > 0 && (
              <>
                <span>·</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600">{post.description}</p>
          <p className="text-sm text-gray-500 mt-4">โดย {post.author}</p>
        </header>
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-primary-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">พร้อมลองการสูญญากาศหรือยัง?</h3>
            <p className="text-gray-600 mb-4">
              เครื่องสูญญากาศแบบพกพา FreshLock รักษาอาหารให้สดนานขึ้นถึง 5 เท่าด้วยการซีลวาล์วแบบกดปุ่มเดียว
            </p>
            <Link
              href="/products/freshlock-starter-kit"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              ซื้อคิทเริ่มต้น FreshLock →
            </Link>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-[#FFF8F0] py-16" aria-labelledby="related-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">
              บทความที่เกี่ยวข้อง
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition mb-2">
                    {rp.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{rp.description}</p>
                  <p className="text-xs text-gray-400">{rp.readingTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
