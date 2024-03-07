import CommentSection from '~/components/CommentSection';
import DescriptionVideo from '~/components/DescriptionVideo';
import { Separator } from '~/components/Separator';
import VideoChannelHeader from '~/components/VideoChannelHeader';
import YoutubePlayer from '~/components/YoutubePlayer';
import OrderCommentsProvider from '~/providers/OrderCommentsProvider';
import { getVideoSubscriptionStatus } from '~/services/channelService';
import { getCommentThreads, getVideoDetailsWithChannels, getVideoRating } from '~/services/videoService';
import PlaylistVideoList from '~/components/PlaylistVideoList';
import { Suspense } from 'react';
import ErrorBoundary from '~/components/ErrorBoundary';
import { navigate } from '~/app/action';
import LoadingPlaylistVideoList from '~/components/PlaylistVideoList/loading';

export default async function WatchPage({ searchParams }: { searchParams: { v: string; list: string } }) {
  const videoId = searchParams.v;
  const playlistId = searchParams.list;
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
      <div className="lg:pr-6 w-full lg:w-9/12">
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
        <Separator className="my-4 md:my-8" />
        <OrderCommentsProvider initialData={commentThreads} videoId={videoId}>
          <CommentSection commentCount={video?.statistics?.commentCount || ''} videoId={videoId} />
        </OrderCommentsProvider>
      </div>
      {playlistId && (
        <div className="lg:w-3/12">
          <ErrorBoundary
            callback={async () => {
              'use server';

              return navigate(`/watch?v=${searchParams.v}`);
            }}
          >
            <Suspense fallback={<LoadingPlaylistVideoList />}>
              <PlaylistVideoList playlistId={playlistId} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
