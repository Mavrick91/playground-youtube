import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getPlaylist, PlaylistResponse } from '~/services/playlistService';
import getQueryClient from '~/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ChannelPlaylists from './ChannelPlaylists';

async function PlaylistPage({ channelId }: { channelId: string }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['playlist', channelId],
    queryFn: async () => getPlaylist({ channelId }),
    getNextPageParam: (lastPage: PlaylistResponse) => lastPage.nextPageToken ?? undefined,
    initialPageParam: '',
  });

  return (
    <MaxWidthWrapper className="mb-32">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChannelPlaylists channelId={channelId} />
      </HydrationBoundary>
    </MaxWidthWrapper>
  );
}

export default PlaylistPage;
