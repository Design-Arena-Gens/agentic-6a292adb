import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  const posts = getAllPosts();
  const latestPost = posts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-balance">
          Making AI Simple for Everyone
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          One easy-to-understand article, every day at 10:00 AM
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-500">
          Explaining AI like you're 5 👶
        </p>
      </div>

      {latestPost && (
        <div className="mb-16">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
            ⭐ LATEST POST
          </div>
          <Link href={`/blog/${latestPost.slug}`}>
            <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer">
              <time className="text-sm text-gray-500 dark:text-gray-500">
                {format(new Date(latestPost.publishedAt), 'MMMM d, yyyy')}
              </time>
              <h2 className="text-3xl font-bold mt-2 mb-4 text-balance">
                {latestPost.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {latestPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {latestPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {latestPost.readTime} min read
                </span>
              </div>
            </article>
          </Link>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="space-y-6">
          {posts.slice(1, 11).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="border-b border-gray-200 dark:border-gray-800 pb-6 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer">
                <time className="text-sm text-gray-500 dark:text-gray-500">
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
                <h3 className="text-xl font-bold mt-2 mb-2 text-balance">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {post.readTime} min read
                  </span>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            No posts yet! Check back at 10:00 AM for our first post.
          </p>
          <p className="text-gray-500">
            Or visit the <a href="/admin" className="text-blue-600 hover:underline">admin panel</a> to generate a post now.
          </p>
        </div>
      )}
    </div>
  );
}
