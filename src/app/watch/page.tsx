import { youtube_v3 } from 'googleapis';
import CommentSection from '~/components/CommentSection';
import DescriptionVideo from '~/components/DescriptionVideo';
import { Separator } from '~/components/Separator';
import YoutubePlayer from '~/components/YoutubePlayer';
import { API } from '~/constants/apiUrl';
import { fetchAllData, fetchData } from '~/lib/fetcher';
// import data from './data.json';

async function getData(searchParams: Record<string, string>): Promise<{
  video: youtube_v3.Schema$VideoListResponse;
  channel: youtube_v3.Schema$ChannelListResponse;
  commentThreads: youtube_v3.Schema$CommentThreadListResponse;
}> {
  const responses = await fetchAllData([
    { endpoint: API.YOUTUBE.VIDEOS.LIST, params: { videoIds: searchParams.v } },
    { endpoint: API.YOUTUBE.COMMENTS.LIST, params: { videoId: searchParams.v } },
  ]);

  const videoData = responses[0] as youtube_v3.Schema$VideoListResponse;
  const commentThreadsData = responses[1] as youtube_v3.Schema$CommentThreadListResponse;

  const channelId = videoData.items?.[0].snippet?.channelId;
  if (!channelId) {
    throw new Error('Channel not found');
  }

  const channelData = await fetchData<youtube_v3.Schema$ChannelListResponse>(API.YOUTUBE.CHANNELS.LIST, {
    channelIds: channelId,
  });

  return { video: videoData, channel: channelData, commentThreads: commentThreadsData };
}

export default async function WatchPage({ searchParams }: { searchParams: Record<string, string> }) {
  const data = await getData(searchParams);
  // console.log('🚀 ~ data:', JSON.stringify(data));
  const video = data.video.items?.[0];
  console.log('🚀 ~ video:', video);
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
