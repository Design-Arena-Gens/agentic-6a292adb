import { BlogPost } from './types';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'data/posts');

// Ensure directory exists (only in non-serverless environments)
function ensurePostsDirectory() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }
  } catch (error) {
    // In serverless environments, we can't create directories
    console.warn('Could not create posts directory:', error);
  }
}

if (typeof window === 'undefined') {
  ensurePostsDirectory();
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(fileContents) as BlogPost;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return posts;
  } catch (error) {
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const posts = getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    return null;
  }
}

export function savePost(post: BlogPost): void {
  const filePath = path.join(postsDirectory, `${post.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
}

export function getLatestPost(): BlogPost | null {
  const posts = getAllPosts();
  return posts.length > 0 ? posts[0] : null;
}

export function getRecentPosts(limit: number = 10): BlogPost[] {
  return getAllPosts().slice(0, limit);
}
