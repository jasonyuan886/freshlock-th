import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'บล็อก — เคล็ดลับการเก็บอาหารและการสูญญากาศ',
  description:
    'บล็อก FreshLock — คู่มือจากผู้เชี่ยวชาญเกี่ยวกับการสูญญากาศ การถนอมอาหาร การเตรียมอาหาร การลดการสูญเสียอาหาร และการรักษาอาหารให้สดนานขึ้นด้วยเครื่องสูญญากาศแบบพกพา',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-primary-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            บล็อก FreshLock
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            คู่มือปฏิบัติเกี่ยวกับการสูญญากาศ การถนอมอาหาร การเตรียมอาหาร และการลดการสูญเสียอาหาร —
            เพื่อให้คุณทานดีขึ้น ประหยัดเงิน และทิ้งน้อยลง
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {posts.map(post => (
              <article
                key={post.slug}
                className="border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-md transition bg-white"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition"
                >
                  อ่านบทความ →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
