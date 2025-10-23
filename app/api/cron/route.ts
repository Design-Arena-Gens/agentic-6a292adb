import { NextResponse } from 'next/server';
import { fetchTrendingAITopics, selectBestTopic } from '@/lib/trending';
import { generateBlogPostFromTopic } from '@/lib/generator';
import { savePost, getAllPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

// This endpoint can be called by Vercel Cron Jobs or external schedulers
// To schedule: Create vercel.json with cron configuration
export async function GET(request: Request) {
  // Optional: Add authentication
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const hour = now.getHours();

    // Log activity
    console.log(`[${now.toISOString()}] Cron job executed`);

    // Check if we should generate a post (10:00 AM)
    if (hour === 10) {
      // Check if we already posted today
      const posts = getAllPosts();
      const today = new Date().toDateString();
      const alreadyPostedToday = posts.some(
        post => new Date(post.publishedAt).toDateString() === today
      );

      if (alreadyPostedToday) {
        return NextResponse.json({
          message: 'Post already generated for today',
          timestamp: now.toISOString(),
        });
      }

      // Generate new post
      const topics = await fetchTrendingAITopics();
      const selectedTopic = await selectBestTopic(topics);
      const post = await generateBlogPostFromTopic(selectedTopic);
      savePost(post);

      return NextResponse.json({
        success: true,
        message: 'Post generated and published',
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
        },
        timestamp: now.toISOString(),
      });
    }

    return NextResponse.json({
      message: 'Cron job executed, no action needed',
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Cron job failed', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
