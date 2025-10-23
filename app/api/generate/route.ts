import { NextResponse } from 'next/server';
import { fetchTrendingAITopics, selectBestTopic } from '@/lib/trending';
import { generateBlogPostFromTopic } from '@/lib/generator';
import { savePost } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Step 1: Fetch trending topics
    const topics = await fetchTrendingAITopics();

    if (topics.length === 0) {
      return NextResponse.json(
        { error: 'No trending topics found' },
        { status: 404 }
      );
    }

    // Step 2: Select the best topic
    const selectedTopic = await selectBestTopic(topics);

    // Step 3: Generate blog post
    const post = await generateBlogPostFromTopic(selectedTopic);

    // Step 4: Save the post
    savePost(post);

    // Step 5: Return success response
    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt,
      },
    });
  } catch (error) {
    console.error('Error generating post:', error);
    return NextResponse.json(
      { error: 'Failed to generate post' },
      { status: 500 }
    );
  }
}
