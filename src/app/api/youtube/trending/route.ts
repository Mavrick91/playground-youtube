import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface Token {
  value: string;
}

export async function GET(): Promise<NextResponse> {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

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

    const videoTrendingResponse: GaxiosResponse<youtube_v3.Schema$VideoListResponse> = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      chart: 'mostPopular',
      regionCode: 'US',
      maxResults: 8,
    });

    if (!videoTrendingResponse.data.items) return NextResponse.json(null, { status: 200 });

    return NextResponse.json(videoTrendingResponse, { status: 200 });
  } catch (error: unknown) {
    console.error('YouTube API error:', error);
  
    let errorMessage = 'Error fetching data from YouTube';
    const statusCode = 500;
  
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
  
    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
}
