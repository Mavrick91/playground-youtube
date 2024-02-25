import { NextRequest, NextResponse } from 'next/server';
import { getCommentReplies } from '~/services/videoService';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const parentCommentId = req.nextUrl.searchParams.get('parentCommentId') as string;

  try {
    const commentReplies = await getCommentReplies(parentCommentId);

    if (!commentReplies.items) return NextResponse.json(null, { status: 200 });

    return NextResponse.json(commentReplies, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('YouTube API error:', error.message);
    }
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
