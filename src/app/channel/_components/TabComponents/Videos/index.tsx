import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getActivitiesDetails, GetActivitiesDetailsReturn } from '~/services/activityService';
import getQueryClient from '~/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ChannelVideos from './ChannelVideos';

type Props = {
  channelId: string;
};

async function VideoPage({ channelId }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['channelActivities', channelId],
    queryFn: async () => getActivitiesDetails({ channelId, maxResults: 50 }),
    getNextPageParam: (lastPage: GetActivitiesDetailsReturn) => lastPage.nextPageToken ?? undefined,
    initialPageParam: '',
  });

  return (
    <MaxWidthWrapper className="mb-32">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChannelVideos channelId={channelId} />
      </HydrationBoundary>
    </MaxWidthWrapper>
  );
}

export default VideoPage;
