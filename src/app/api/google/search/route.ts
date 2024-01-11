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
  const location = req.nextUrl.searchParams.get('location');
  const radius = req.nextUrl.searchParams.get('radius');

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
    if (location && radius) {
      searchParams.location = location as string;
      searchParams.locationRadius = `${radius}km` as string;
      searchParams.type = ['video'];
    }

    const searchResponse: GaxiosResponse<youtube_v3.Schema$SearchListResponse> =
      await youtube.search.list(searchParams);

    if (!searchResponse.data.items)
      return NextResponse.json(null, { status: 200 });

    const videoIds = searchResponse.data.items
      .filter(item => item.id?.kind === 'youtube#video')
      .map(item => item.id?.videoId) as string[];

    const channelResponses = await Promise.all(
      searchResponse.data.items.map(item =>
        youtube.channels.list({
          part: ['snippet'],
          id: [item.snippet?.channelId || ''],
        })
      )
    );

    const statsResponse = await youtube.videos.list({
      id: videoIds,
      part: ['statistics'],
    });

    if (!statsResponse.data.items)
      return NextResponse.json(null, { status: 200 });

    const viewCounts: Record<string, string> = {};
    statsResponse.data.items.forEach(item => {
      if (item.id && item.statistics) {
        viewCounts[item.id] = item.statistics.viewCount || '0';
      }
    });

    const itemsWithStatistics = searchResponse.data.items.map(item => {
      if (item.id && item.id.kind === 'youtube#video' && item.id.videoId) {
        return {
          ...item,
          statistics: { viewCount: viewCounts[item.id.videoId] || '0' },
        };
      }
      return item;
    });

    const itemsWithStatisticsAndChannelThumbnails = itemsWithStatistics.map(
      (item, index) => {
        const channelResponse = channelResponses[index];
        const urlThumbnail = channelResponse.data.items?.[0].snippet?.thumbnails?.default?.url;

        if (channelResponse.data.items && urlThumbnail) {
          if (item.snippet) {
            return {
              ...item,
              channelThumbnail: urlThumbnail
            };
          }
          return null
        }
      }
    );

    return NextResponse.json(
      { ...searchResponse.data, items: itemsWithStatisticsAndChannelThumbnails },
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
