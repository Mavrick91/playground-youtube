import { parseISO } from 'date-fns';
import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { arePublishedDatesValid, isValidDate } from '~/lib/utils';

interface Token {
  value: string;
}

const getOAuth2Client = () => new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

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

  const searchParams: youtube_v3.Params$Resource$Search$List = {
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

    return NextResponse.json(
      searchResponse,
      { status: 200 }
    );
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('YouTube API error:', error.message);
  }
  return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
}
}
