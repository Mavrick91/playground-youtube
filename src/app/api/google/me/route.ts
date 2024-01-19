import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { NextResponse } from 'next/server';
import { getYouTubeClient } from '~/services/oauthService';

export async function GET(): Promise<NextResponse> {
  const youtubeClient = await getYouTubeClient();

  try {
    const data: GaxiosResponse<youtube_v3.Schema$ChannelListResponse> = await youtubeClient.channels.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      mine: true,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Google API error:', error?.message);
    }
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
