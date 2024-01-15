import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createURL } from '~/lib/url-utils';

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

    const videoIds = req.nextUrl.searchParams.get('v')?.split(',');
    console.log('🚀 ~ videoIds:', videoIds);
    const part = req.nextUrl.searchParams.get('parts')?.split(',');

    if (!videoIds) {
      return NextResponse.json(
        { message: 'No videoIds provided' },
        { status: 400 }
      );
    }

    const videoResponse: GaxiosResponse<youtube_v3.Schema$VideoListResponse> =
      await youtube.videos.list({
        id: videoIds,
        part: ['snippet', 'statistics'],
      });

    if (!videoResponse.data.items)
      return NextResponse.json(null, { status: 200 });

    const videoResponseWithChannel = await Promise.all(
      videoResponse.data.items.map(item => {
        const channelUrl = createURL('/api/youtube/channels', {
          channelId: item.snippet?.channelId!,
        });

        return fetch(channelUrl, {
          headers: {
            Cookie: `auth_token=${token.value}`,
          },
        }).then(res => res.json());
      })
    );
    console.log('🚀 ~ videoResponseWithChannel:', videoResponseWithChannel);

    return NextResponse.json(
      {
        ...videoResponse.data,
        items: videoResponseWithChannel.map((item, index) => ({
          ...videoResponse.data.items![index],
          channel: item.items[0],
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('YouTube API error:', error?.message);
    return NextResponse.json(
      { message: 'Error fetching data from YouTube' },
      { status: 500 }
    );
  }
}