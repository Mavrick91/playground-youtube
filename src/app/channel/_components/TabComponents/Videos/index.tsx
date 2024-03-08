import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getActivities, getActivitiesDetails, GetActivitiesDetailsReturn } from '~/services/activityService';
import { youtube_v3 } from 'googleapis';
import getQueryClient from '~/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ChannelVideos from '~/app/channel/_components/TabComponents/Videos/ChannelVideos';
import { Suspense } from 'react';
import VideoLoading from '~/app/channel/_components/TabComponents/Videos/loading';
import { getVideoDetailsWithChannels } from '~/services/videoService';
import { VideoListResponseWithChannel } from '~/types/searchVideos';

type Props = {
  channelId: string;
};

function getVideoIdFromItemContentDetails(item: youtube_v3.Schema$Activity) {
  if (item.contentDetails?.upload?.videoId) return item.contentDetails.upload.videoId;
  return item.contentDetails?.playlistItem?.resourceId?.videoId;
}

async function VideoPage({ channelId }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['channelActivities', channelId],
    queryFn: async ({ pageParam = '' }) => getActivitiesDetails({ channelId, maxResults: 50, pageToken: pageParam }),
    getNextPageParam: (lastPage: GetActivitiesDetailsReturn) => lastPage.nextPageToken ?? undefined,
    initialPageParam: '',
  });

  return (
    <MaxWidthWrapper className="mb-32">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<VideoLoading />}>
          <ChannelVideos channelId={channelId} />
        </Suspense>
      </HydrationBoundary>
    </MaxWidthWrapper>
  );
}

export default VideoPage;
