import { Separator } from '~/components/Separator';
import OrderCommentsProvider from '~/providers/OrderCommentsProvider';
import { getVideoSubscriptionStatus } from '~/services/channelService';
import { getCommentThreads, getVideoDetailsWithChannels, getVideoRating } from '~/services/videoService';
import { Suspense } from 'react';
import ErrorBoundary from '~/components/ErrorBoundary';
import { navigate } from '~/app/action';
import YoutubePlayer from './_components/YoutubePlayer';
import VideoChannelHeader from './_components/VideoChannelHeader';
import DescriptionVideo from './_components/DescriptionVideo';
import CommentSection from './_components/CommentSection';
import PlaylistVideoList from './_components/PlaylistVideoList';
import LoadingPlaylistVideoList from './_components/PlaylistVideoList/loading';

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
    <div className="flex flex-col py-6 mb-16">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-9/12 lg:pr-6">
          <YoutubePlayer video={video} />
        </div>
        {playlistId && (
          <div className="my-5 lg:my-0 lg:w-3/12">
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

      <div className="lg:w-9/12 lg:pr-6">
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
    </div>
  );
}
