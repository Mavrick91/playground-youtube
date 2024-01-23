import CommentSection from '~/components/CommentSection';
import DescriptionVideo from '~/components/DescriptionVideo';
import { Separator } from '~/components/Separator';
import VideoChannelHeader from '~/components/VideoChannelHeader';
import YoutubePlayer from '~/components/YoutubePlayer';
import OrderCommentsProvider from '~/providers/OrderCommentsProvider';
import { getVideoSubscriptionStatus } from '~/services/channelService';
import { getCommentThreads, getVideoDetailsWithChannels, getVideoRating } from '~/services/videoService';

export default async function WatchPage({ searchParams }: { searchParams: { v: string } }) {
  const videoId = searchParams.v;
  const videoData = await getVideoDetailsWithChannels([videoId]);
  const channel = videoData?.items?.[0].channel;
  const video = videoData.items?.[0];

  const [commentThreads, videoRating, videoSubscription] = await Promise.all([
    getCommentThreads(videoId, 'relevance'),
    getVideoRating(videoId),
    getVideoSubscriptionStatus(channel!.id!),
  ]);

  return (
    <div className="flex py-6 mb-16">
      <div className="pr-6 w-9/12">
        <YoutubePlayer video={video} />
        <VideoChannelHeader
          video={video}
          channel={channel}
          videoRating={videoRating}
          videoSubscription={videoSubscription}
        />
        <DescriptionVideo
          description={video?.snippet?.description || ''}
          publishedAt={video?.snippet?.publishedAt || ''}
          viewCount={video?.statistics?.viewCount || ''}
        />
        <Separator className="my-8" />
        <OrderCommentsProvider initialData={commentThreads} videoId={videoId}>
          <CommentSection commentCount={video?.statistics?.commentCount || ''} videoId={videoId} />
        </OrderCommentsProvider>
      </div>
      <div className="border border-red-500 w-3/12">test</div>
    </div>
  );
}
