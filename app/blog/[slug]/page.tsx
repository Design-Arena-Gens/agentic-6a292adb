import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <time className="text-sm text-gray-500 dark:text-gray-500">
          {format(new Date(post.publishedAt), 'MMMM d, yyyy')} · {post.readTime} min read
        </time>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-balance">
          {post.title}
        </h1>
        <div className="flex gap-2 flex-wrap mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(post.content) }}
      />

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
        <h3 className="text-lg font-bold mb-3">🎯 What This Means For Humans</h3>
        <p className="text-gray-700 dark:text-gray-300">{post.eli5Summary}</p>
      </div>

      <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h3 className="text-xl font-bold mb-4">Share This Post</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Twitter / X</p>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">
              <p className="text-sm whitespace-pre-wrap">{post.socialCaptions.twitter}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">LinkedIn</p>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">
              <p className="text-sm whitespace-pre-wrap">{post.socialCaptions.linkedin}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Threads</p>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">
              <p className="text-sm whitespace-pre-wrap">{post.socialCaptions.threads}</p>
            </div>
          </div>
        </div>
      </div>

      {post.sourceUrl && (
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          Source: <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {post.sourceUrl}
          </a>
        </div>
      )}
    </article>
  );
}

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');

  // Wrap in paragraphs if not already wrapped
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>';
  }

  return html;
}
