import { NextRequest, NextResponse } from 'next/server';
import { getCommentThreads } from '~/app/services/youtubeService';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const videoId = req.nextUrl.searchParams.get('videoId') as string;
  const order = req.nextUrl.searchParams.get('order') as 'time' | 'relevance';

  try {
    const commentThreads = await getCommentThreads(videoId, order);

    if (!commentThreads.items) return NextResponse.json(null, { status: 200 });

    return NextResponse.json({ data: commentThreads }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('YouTube API error:', error.message);
    }
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
