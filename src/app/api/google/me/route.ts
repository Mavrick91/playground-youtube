import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { NextResponse } from 'next/server';
import { getYouTubeClient } from '~/services/oauthService';
import prisma from '~/lib/prisma';

async function getYouTubeData(youtubeClient: youtube_v3.Youtube): Promise<youtube_v3.Schema$ChannelListResponse> {
  const { data }: GaxiosResponse<youtube_v3.Schema$ChannelListResponse> = await youtubeClient.channels.list({
    part: ['snippet', 'contentDetails', 'statistics'],
    mine: true,
  });
  return data;
}

async function findExistingUserByChannelId(channelId: string) {
  return prisma.user.findUnique({
    where: {
      youtubeId: channelId,
    },
  });
}

async function registerNewUser(channel: youtube_v3.Schema$Channel) {
  const userDetails = {
    youtubeId: channel.id as string,
    username: channel.snippet!.title as string,
    profilePic: channel.snippet!.thumbnails!.default!.url as string,
  };

  return prisma.user.create({
    data: userDetails,
  });
}

export async function GET(): Promise<NextResponse> {
  const youtubeClient = await getYouTubeClient();

  try {
    const youtubeData = await getYouTubeData(youtubeClient);
    const channelData = youtubeData.items?.[0];

    if (!channelData) {
      return NextResponse.json({ message: 'No channel found' }, { status: 404 });
    }

    const existingUser = await findExistingUserByChannelId(channelData.id!);
    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 });
    }

    const newUser = await registerNewUser(channelData);
    return NextResponse.json(newUser, { status: 200 });
  } catch (error: unknown) {
    console.error('Error:', error instanceof Error ? error?.message : error);
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
