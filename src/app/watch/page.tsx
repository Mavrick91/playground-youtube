import CommentSection from '~/components/CommentSection';
import DescriptionVideo from '~/components/DescriptionVideo';
import { Separator } from '~/components/Separator';
import VideoChannelHeader from '~/components/VideoChannelHeader';
import YoutubePlayer from '~/components/YoutubePlayer';
import OrderCommentsProvider from '~/providers/OrderCommentsProvider';
import {
  getCommentThreads,
  getVideoDetailsWithChannels,
  getVideoRating,
  getVideoSubscriptionStatus,
} from '../services/youtubeService';

export default async function WatchPage({ searchParams }: { searchParams: { v: string } }) {
  const videoId = searchParams.v;
  const videoData = await getVideoDetailsWithChannels([videoId]);
  const channel = videoData?.items?.[0].channel;
  const commentThreads = await getCommentThreads(videoId, 'relevance');
  const videoRating = await getVideoRating(videoId);
  const videoSubscription = await getVideoSubscriptionStatus(channel!.id!);
  const video = videoData.items?.[0];

  return (
    <div className="flex p-6 mb-16">
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
