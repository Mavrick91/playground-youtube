import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const getOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
};

interface Token {
    value: string;
  }
  
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

    const channelId = req.nextUrl.searchParams.get('channelId');

    const channelResponse = await youtube.channels.list({
      part: ['snippet', 'statistics'],
      id: [channelId || ''],
    });

    return NextResponse.json(channelResponse.data, { status: 200 });
  } catch (error: any) {
    console.error('YouTube API error:', error?.message);
    return NextResponse.json(
      { message: 'Error fetching data from YouTube' },
      { status: 500 }
    );
  }
}