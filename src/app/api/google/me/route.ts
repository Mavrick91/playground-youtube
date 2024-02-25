import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { NextResponse } from 'next/server';
import { getYouTubeClient } from '~/services/oauthService';

async function getYouTubeData(youtubeClient: youtube_v3.Youtube): Promise<youtube_v3.Schema$ChannelListResponse> {
  const { data }: GaxiosResponse<youtube_v3.Schema$ChannelListResponse> = await youtubeClient.channels.list({
    part: ['snippet', 'contentDetails', 'statistics'],
    mine: true,
  });
  return data;
}

export async function GET(): Promise<NextResponse> {
  const youtubeClient = await getYouTubeClient();

  try {
    const youtubeData = await getYouTubeData(youtubeClient);
    const channelData = youtubeData.items?.[0];

    if (!channelData) {
      return NextResponse.json({ message: 'No channel found' }, { status: 404 });
    }

    return NextResponse.json(channelData, { status: 200 });
  } catch (error: unknown) {
    console.error('Error:', error instanceof Error ? error?.message : error);
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
