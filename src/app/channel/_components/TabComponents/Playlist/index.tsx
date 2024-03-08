import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getPlaylist } from '~/services/playlistService';
import PlaylistCard from '~/components/PlaylistCard';
import ContentNoItems from '../../../../../components/ContentNoItems';

async function PlaylistPage({ channelId }: { channelId: string }) {
  const playlists = await getPlaylist({
    channelId,
  });

  const hasItems = playlists.items?.some(playlist => (playlist.contentDetails?.itemCount || 0) > 0);

  if (!playlists.items?.length || !hasItems) {
    return <ContentNoItems />;
  }

  return (
    <MaxWidthWrapper className="mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-1 gap-y-4 lg:gap-y-11 mt-11">
        {playlists.items?.map(playlist => {
          const playlistItemsCount = playlist.contentDetails?.itemCount || 0;

          if (!playlistItemsCount) return null;

          return (
            <div key={playlist.id} className="col-span-1 lg:col-span-2">
              <PlaylistCard playlist={playlist} />
            </div>
          );
        })}
      </div>
    </MaxWidthWrapper>
  );
}

export default PlaylistPage;
