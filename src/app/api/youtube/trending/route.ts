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

    const response: GaxiosResponse<youtube_v3.Schema$VideoListResponse> = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      chart: 'mostPopular',
      regionCode: 'US',
      maxResults: 8,
    });

    const items = response.data.items;

    if (!items) return NextResponse.json(null, { status: 200 });

    const channels = await Promise.all(
      items.map(async item => {
        const channelResponse = await youtube.channels.list({
          part: ['snippet', 'statistics'],
          id: [item.snippet?.channelId || ''],
        });

        if (!channelResponse.data.items) return null;

        return channelResponse.data.items[0];
      })
    );

    const MergeVideosChannels = items.map((item, index) => {
      const channelFound = channels.find(channel => channel?.id === item.snippet?.channelId);

      return {
        ...item,
        channel: channelFound,
      };
    });

    return NextResponse.json(
      {
        ...response.data,
        items: MergeVideosChannels,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('YouTube API error:', error?.message);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
}
