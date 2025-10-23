'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  publishedAt: string;
  tags: string[];
}

interface TrendingTopic {
  title: string;
  source: string;
  relevanceScore: number;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [trending, setTrending] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPosts();
    loadTrending();
  }, []);

  async function loadPosts() {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  async function loadTrending() {
    try {
      setLoading(true);
      const res = await fetch('/api/trending');
      const data = await res.json();
      setTrending(data);
    } catch (error) {
      console.error('Error loading trending topics:', error);
    } finally {
      setLoading(false);
    }
  }

  async function generatePost() {
    try {
      setGenerating(true);
      setMessage('Generating post from trending topics...');

      const res = await fetch('/api/generate', {
        method: 'POST',
      });

      const data = await res.json();

      if (data.success) {
        setMessage(`✅ Post generated successfully: "${data.post.title}"`);
        await loadPosts();
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('❌ Error generating post');
      }
    } catch (error) {
      console.error('Error generating post:', error);
      setMessage('❌ Error generating post');
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your AI for Humans blog
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button
              onClick={generatePost}
              disabled={generating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {generating ? '⏳ Generating...' : '✨ Generate New Post'}
            </button>
            <button
              onClick={loadTrending}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? '⏳ Loading...' : '🔄 Refresh Trending Topics'}
            </button>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
              <span className="text-2xl font-bold">{posts.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Trending Topics</span>
              <span className="text-2xl font-bold">{trending.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Next Post</span>
              <span className="text-lg font-semibold text-blue-600">10:00 AM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Trending AI Topics</h2>
          <div className="space-y-3">
            {trending.map((topic, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-balance">{topic.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Source: {topic.source}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {topic.relevanceScore}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          <div className="space-y-3">
            {posts.slice(0, 10).map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-4"
              >
                <h3 className="font-semibold mb-2 text-balance">{post.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                  </p>
                  <a
                    href={`/blog/${post.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Automation Schedule</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="font-mono font-semibold">9:55 AM</span>
            <span className="text-gray-600 dark:text-gray-400">→</span>
            <span>Collect & shortlist trending topics</span>
          </div>
          <div className="flex items-center gap-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded">
            <span className="font-mono font-semibold">10:00 AM</span>
            <span className="text-gray-600 dark:text-gray-400">→</span>
            <span className="font-semibold">Draft & publish the post</span>
          </div>
          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="font-mono font-semibold">10:10 AM</span>
            <span className="text-gray-600 dark:text-gray-400">→</span>
            <span>Run SEO optimizer and update metadata</span>
          </div>
          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="font-mono font-semibold">10:20 AM</span>
            <span className="text-gray-600 dark:text-gray-400">→</span>
            <span>Post social shares + submit sitemap ping</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
          💡 Tip: Set up a cron job or serverless function to call <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">/api/generate</code> at 10:00 AM daily
        </p>
      </div>
    </div>
  );
}
