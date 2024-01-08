import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface Token {
  value: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const token: Token | undefined = cookies().get('auth_token');
  const query = req.nextUrl.searchParams.get('q');
  const topicId = req.nextUrl.searchParams.get('topicId');
  const regionCode = req.nextUrl.searchParams.get('regionCode');
  const channelId = req.nextUrl.searchParams.get('channelId');

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  oAuth2Client.setCredentials({ access_token: token.value });

  try {
    const youtube: youtube_v3.Youtube = google.youtube({
      version: 'v3',
      auth: oAuth2Client,
    });

    let searchParams: youtube_v3.Params$Resource$Search$List = {
      part: ['snippet'],
      maxResults: 8,
      type: ['video', 'channel'],
      order: 'date',
    };

    if (query) {
      searchParams.q = query;
    }
    if (topicId) {
      searchParams.topicId = topicId as string;
    }
    if (regionCode) {
      searchParams.regionCode = regionCode as string;
    }

    const response: GaxiosResponse<youtube_v3.Schema$SearchListResponse> =
      await youtube.search.list(searchParams);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('YouTube API error:', error?.message);
    return NextResponse.json(
      { message: 'Error fetching data from YouTube' },
      { status: 500 }
    );
  }
}
