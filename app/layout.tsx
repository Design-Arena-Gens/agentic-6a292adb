import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI for Humans - Making AI Simple for Everyone',
  description: 'Daily AI news and breakthroughs explained like you\'re 5. Making complex AI concepts simple, fun, and friendly.',
  keywords: ['AI', 'artificial intelligence', 'machine learning', 'AI news', 'tech news', 'AI explained'],
  authors: [{ name: 'AI for Humans' }],
  openGraph: {
    title: 'AI for Humans - Making AI Simple for Everyone',
    description: 'Daily AI news and breakthroughs explained like you\'re 5.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Humans - Making AI Simple for Everyone',
    description: 'Daily AI news and breakthroughs explained like you\'re 5.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                🤖 AI for Humans
              </a>
              <div className="flex gap-6">
                <a href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Home
                </a>
                <a href="/admin" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Admin
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">AI for Humans - Making AI simple for everyone</p>
            <p className="text-sm">New post every day at 10:00 AM</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
