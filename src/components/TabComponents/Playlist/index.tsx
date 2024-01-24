import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getPlaylist } from '~/services/playlistService';
import PlaylistCard from '~/components/PlaylistCard';
import ContentNoItems from '../../ContentNoItems';

async function PlaylistPage({ channelId }: { channelId: string }) {
  const playlists = await getPlaylist({
    channelId,
  });

  if (!playlists.items?.length) {
    return <ContentNoItems />;
  }
  return (
    <MaxWidthWrapper className="mb-32">
      <div className="grid grid-cols-12 gap-x-1 gap-y-11 mt-11">
        {playlists.items?.map(playlist => (
          <div key={playlist.id} className="col-span-2">
            <PlaylistCard playlist={playlist} />
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

export default PlaylistPage;
