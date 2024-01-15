import { parseISO } from 'date-fns';
import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createURL } from '~/lib/url-utils';
import { arePublishedDatesValid, isValidDate } from '~/lib/utils';

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

const getSearchParams = (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get('q');
  const topicId = req.nextUrl.searchParams.get('topicId');
  const regionCode = req.nextUrl.searchParams.get('regionCode');
  const location = req.nextUrl.searchParams.get('location');
  const radius = req.nextUrl.searchParams.get('radius');
  const publishedAfter = req.nextUrl.searchParams.get('publishedAfter');
  const publishedBefore = req.nextUrl.searchParams.get('publishedBefore');
  const videoDuration = req.nextUrl.searchParams.get('videoDuration');
  const order = req.nextUrl.searchParams.get('order');

  let searchParams: youtube_v3.Params$Resource$Search$List = {
    part: ['snippet'],
    maxResults: 8,
    type: ['video', 'channel'],
  };

  if (query) searchParams.q = query;
  if (topicId) searchParams.topicId = topicId;
  if (videoDuration) searchParams.videoDuration = videoDuration;
  if (order) {
    searchParams.type = ['channel'];
    searchParams.order = order;
  }
  if (regionCode) searchParams.regionCode = regionCode;
  if (location && radius) {
    searchParams.location = location;
    searchParams.locationRadius = `${radius}km`;
    searchParams.type = ['video'];
  }
  if (publishedAfter && publishedBefore && arePublishedDatesValid(publishedAfter, publishedBefore)) {
    if (isValidDate(publishedAfter)) {
      searchParams.publishedAfter = parseISO(publishedAfter).toISOString();
    }
    if (isValidDate(publishedBefore)) {
      searchParams.publishedBefore = parseISO(publishedBefore).toISOString();
    }
  }
  console.log('🚀 ~ searchParams:', searchParams);
  return searchParams;
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

    const searchParams = getSearchParams(req);

    const searchResponse: GaxiosResponse<youtube_v3.Schema$SearchListResponse> =
      await youtube.search.list(searchParams);

    if (!searchResponse.data.items) return NextResponse.json(null, { status: 200 });

    const videoIds = searchResponse.data.items
      .filter(item => item.id?.kind === 'youtube#video')
      .map(item => item.id?.videoId)
      .join(',') as string;

    const channelResponses = await Promise.all(
      searchResponse.data.items.map(item => {
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

    const videosUrl = createURL('/api/youtube/videos', {
      videoIds,
      parts: 'statistics',
    });

    const statsResponse = await fetch(videosUrl, {
      headers: {
        Cookie: `auth_token=${token.value}`,
      },
    });

    const statsResponseJson: GaxiosResponse<youtube_v3.Schema$VideoListResponse> = await statsResponse.json();

    if (!statsResponseJson.data.items) return NextResponse.json(null, { status: 200 });

    const viewCounts: Record<string, string> = {};
    statsResponseJson.data.items.forEach(item => {
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

    const itemsWithStatisticsAndChannelThumbnails = itemsWithStatistics.map((item, index) => {
      const channelResponse = channelResponses[index];
      const urlThumbnail = channelResponse.data.items?.[0].snippet?.thumbnails?.default?.url;

      if (channelResponse.data.items && urlThumbnail) {
        if (item.snippet) {
          return {
            ...item,
            channelThumbnail: urlThumbnail,
          };
        }
        return null;
      }
    });

    return NextResponse.json(
      {
        ...searchResponse.data,
        items: itemsWithStatisticsAndChannelThumbnails,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('YouTube API error:', error?.message);
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
