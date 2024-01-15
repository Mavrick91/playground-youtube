import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface Token {
  value: string;
}

const getOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  const oAuth2Client = getOAuth2Client();

  const token: Token | undefined = cookies().get('auth_token');

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  oAuth2Client.setCredentials({ access_token: token.value });

  try {
    const youtube: youtube_v3.Youtube = google.youtube({
      version: 'v3',
      auth: oAuth2Client,
    });

    const videoId = req.nextUrl.searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json({ message: 'No videoId provided' }, { status: 400 });
    }

    const commentThreadsResponse: GaxiosResponse<youtube_v3.Schema$CommentListResponse> =
      await youtube.commentThreads.list({
        videoId,
        part: ['snippet'],
      });

    if (!commentThreadsResponse.data.items) return NextResponse.json(null, { status: 200 });

    return NextResponse.json(commentThreadsResponse.data, { status: 200 });
  } catch (error: any) {
    console.error('YouTube API error:', error?.message);
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
