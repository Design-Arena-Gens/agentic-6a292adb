import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import Link from 'next/link';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className={`
          border border-gray-200 dark:border-gray-800 rounded-lg p-6
          hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer
          ${featured ? 'p-8' : ''}
        `}
      >
        <time className="text-sm text-gray-500 dark:text-gray-500">
          {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
        </time>
        <h2
          className={`font-bold mt-2 mb-4 text-balance ${
            featured ? 'text-3xl' : 'text-xl'
          }`}
        >
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`text-sm px-3 py-1 rounded-full ${
                  featured
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">{post.readTime} min read</span>
        </div>
      </article>
    </Link>
  );
}
