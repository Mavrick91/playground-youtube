import PlaylistVideoHeader from '~/app/watch/_components/PlaylistVideoList/PlaylistVideoHeader';
import { getPlaylist, getPlaylistItems } from '~/services/playlistService';
import PlaylistVideoListItem from '~/app/watch/_components/PlaylistVideoList/PlaylistVideoListItem';

type Props = {
  playlistId: string;
};

export default async function PlaylistVideoList({ playlistId }: Props) {
  const [playlist, playlistItems] = await Promise.all([
    getPlaylist({
      id: [playlistId],
      part: ['snippet'],
    }),
    getPlaylistItems({
      playlistId,
      part: ['snippet'],
      maxResults: 50,
    }),
  ]);

  const playlistSnippet = playlist.items?.[0].snippet;
  const playlistTitle = playlistSnippet?.title as string;
  const channelTitle = playlistSnippet?.channelTitle as string;
  const videosCount = playlistItems.items?.length as number;
  const videoIds = playlistItems.items?.map(item => item.snippet?.resourceId?.videoId as string) as string[];

  return (
    <div className="border rounded-xl border-black pb-3">
      <PlaylistVideoHeader
        videoIds={videoIds}
        playlistTitle={playlistTitle}
        channelTitle={channelTitle}
        videosCount={videosCount}
      />
      <div className="max-h-[27.2rem] overflow-y-auto">
        {playlistItems.items?.map((item, index) => {
          const videoItemSnippet = item.snippet;
          const videoId = videoItemSnippet?.resourceId?.videoId as string;
          const thumbnail = videoItemSnippet?.thumbnails?.medium?.url as string;
          const title = videoItemSnippet?.title as string;
          const videoChannelTitle = videoItemSnippet?.channelTitle as string;

          return (
            <PlaylistVideoListItem
              playlistId={playlistId}
              key={item.id}
              index={index}
              videoId={videoId}
              thumbnail={thumbnail}
              title={title}
              channelTitle={videoChannelTitle}
            />
          );
        })}
      </div>
    </div>
  );
}
