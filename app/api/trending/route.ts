import { NextResponse } from 'next/server';
import { fetchTrendingAITopics } from '@/lib/trending';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const topics = await fetchTrendingAITopics();
    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trending topics' }, { status: 500 });
  }
}
