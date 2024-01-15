import { cookies } from 'next/headers';
import React from 'react';
import { GaxiosResponse } from 'gaxios';
import YoutubePlayer from '~/components/YoutubePlayer';
import DescriptionVideo from '~/components/DescriptionVideo';
import CommentSection from '~/components/CommentSection';
import { createURL } from '~/lib/url-utils';
import { youtube_v3 } from 'googleapis';
import { Separator } from '~/components/Separator';
import { API } from '~/constants/apiUrl';
import data from './data.json';

async function getData(
  authToken: string | undefined,
  searchParams: Record<string, string>
): Promise<{
  video: youtube_v3.Schema$VideoListResponse;
  channel: youtube_v3.Schema$ChannelListResponse;
  commentThreads: youtube_v3.Schema$CommentThreadListResponse;
}> {
  const options = {
    cache: 'no-cache',
    headers: {
      Cookie: `auth_token=${authToken}`,
    },
  } as RequestInit;

  const videoUrl = createURL(API.YOUTUBE.VIDEOS.LIST, { videoIds: searchParams.v });
  const commentThreadsUrl = createURL(API.YOUTUBE.COMMENTS.LIST, { videoId: searchParams.v });

  const [videoRes, commentThreadsRes] = await Promise.all([
    fetch(videoUrl, options),
    fetch(commentThreadsUrl, options),
  ]);

  const [videoData, commentThreadsData]: [
    GaxiosResponse<youtube_v3.Schema$VideoListResponse>,
    GaxiosResponse<youtube_v3.Schema$CommentListResponse>,
  ] = await Promise.all([videoRes.json(), commentThreadsRes.json()]);

  if (!videoRes.ok) {
    throw new Error(videoData.statusText);
  }

  if (!commentThreadsRes.ok) {
    throw new Error(commentThreadsData.statusText);
  }

  const channelId = videoData.data.items?.[0].snippet?.channelId;
  if (!channelId) {
    throw new Error('Channel not found');
  }

  const channelUrl = createURL(API.YOUTUBE.CHANNELS.LIST, { channelIds: channelId });
  const channelRes = await fetch(channelUrl, options);
  const channelData: GaxiosResponse<youtube_v3.Schema$ChannelListResponse> = await channelRes.json();

  if (!channelRes.ok) {
    throw new Error(channelData.statusText);
  }

  return { video: videoData.data, channel: channelData.data, commentThreads: commentThreadsData.data };
}

export default async function WatchPage({ searchParams }: { searchParams: Record<string, string> }) {
  const authToken = cookies().get('auth_token')?.value;
  // const data = await getData(authToken, searchParams);
  // console.log('🚀 ~ data:', JSON.stringify(data));
  const video = data.video.items?.[0];
  const channel = data.channel.items?.[0];
  const { commentThreads } = data;

  return (
    <div className="overflow-auto">
      <div className="flex pt-6">
        <div className="pr-6 w-9/12">
          <YoutubePlayer video={video} channel={channel} />
          <DescriptionVideo
            description={video?.snippet?.description || ''}
            publishedAt={video?.snippet?.publishedAt || ''}
            viewCount={video?.statistics?.viewCount || ''}
          />
          <Separator className="my-8" />
          <CommentSection commentCount={video?.statistics?.commentCount || ''} commentThreads={commentThreads} />
        </div>
        <div className="border border-red-500 w-3/12">test</div>
      </div>
    </div>
  );
}
