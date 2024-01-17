import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import CommentSection from '~/components/CommentSection';
import DescriptionVideo from '~/components/DescriptionVideo';
import { Separator } from '~/components/Separator';
import YoutubePlayer from '~/components/YoutubePlayer';
import { getYouTubeClient } from '../services/oauthService';
// import data from './data.json';

async function getData(videoId: string) {
  const youtubeClient = getYouTubeClient();

  const { data: videoData }: GaxiosResponse<youtube_v3.Schema$VideoListResponse> = await youtubeClient.videos.list({
    id: [videoId],
    part: ['snippet', 'statistics', 'contentDetails'],
  });

  const channelId = videoData.items?.[0].snippet?.channelId;

  let channelData: youtube_v3.Schema$ChannelListResponse | null = null;
  if (channelId) {
    const { data } = await youtubeClient.channels.list({
      part: ['snippet', 'statistics'],
      id: [channelId],
    });
    channelData = data;
  }

  return { videoData, channelData };
}

export default async function WatchPage({ searchParams }: { searchParams: { v: string } }) {
  const { videoData, channelData } = await getData(searchParams.v);
  const video = videoData.items?.[0];
  const channel = channelData?.items?.[0];

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
          <CommentSection commentCount={video?.statistics?.commentCount || ''} videoId={searchParams.v} />
        </div>
        <div className="border border-red-500 w-3/12">test</div>
      </div>
    </div>
  );
}
