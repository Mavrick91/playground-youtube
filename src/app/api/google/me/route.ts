import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { NextResponse } from 'next/server';
import { getYouTubeClient } from '~/services/oauthService';
import prisma from '~/lib/prisma';

export async function GET(): Promise<NextResponse> {
  const youtubeClient = await getYouTubeClient();

  try {
    const { data: youtubeData }: GaxiosResponse<youtube_v3.Schema$ChannelListResponse> =
      await youtubeClient.channels.list({
        part: ['snippet', 'contentDetails', 'statistics'],
        mine: true,
      });

    const myChannel = youtubeData.items?.[0];

    if (!myChannel) {
      return NextResponse.json({ message: 'No channel found' }, { status: 404 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        youtubeId: myChannel.id,
      },
    });

    if (existingUser) {
      return NextResponse.json({ data: existingUser }, { status: 200 });
    }

    try {
      const userData = {
        youtubeId: myChannel.id,
        username: myChannel.snippet?.title,
        profilePic: myChannel.snippet?.thumbnails?.default?.url,
      };

      const newUser = await prisma.user.create({
        data: userData,
      });

      return NextResponse.json({ data: newUser }, { status: 200 });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Google API error:', error?.message);
    }
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
