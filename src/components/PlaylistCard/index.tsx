import { youtube_v3 } from 'googleapis';
import ClientImage from '~/components/ClientImage';
import { AlignLeft, Play } from 'lucide-react';
import Link from 'next/link';
import { getPlaylistItems } from '~/services/playlistService';
import React from 'react';

type Props = {
  playlist: youtube_v3.Schema$Playlist;
};

export default async function PlaylistCard({ playlist }: Props) {
  const playlistItems = await getPlaylistItems({
    playlistId: playlist.id || '',
  });
  const playlistItemsCount = playlist.contentDetails?.itemCount || 0;

  return (
    <div>
      <Link href={`/watch?v=${playlistItems.items?.[0].contentDetails?.videoId}&list=${playlist.id}`}>
        <div className="w-full aspect-video relative">
          <div className="w-full h-full overflow-hidden relative !-top-3 scale-90 rounded-lg">
            <ClientImage
              fill
              src={playlist.snippet?.thumbnails?.medium?.url || ''}
              alt="Thumbnail playlist bg"
              className="rounded-lg blur-[10px]"
            />
          </div>
          <ClientImage
            fill
            src={playlist.snippet?.thumbnails?.medium?.url || ''}
            alt="Thumbnail playlist"
            className="rounded-lg border border-white"
          />
          <div className="absolute opacity-0 hover:opacity-100 transition-opacity inset-0 rounded-lg text-white flex items-center justify-center gap-2 bg-black/60 h-full">
            <Play width={20} fill="white" stroke="none" />

            <span className="text-xs font-medium">Read All</span>
          </div>
          <div className="absolute bottom-3 flex items-center gap-2 right-3 text-white bg-black/60 text-xs py-1 px-1 rounded-md font-medium">
            <AlignLeft size={16} />
            {playlistItemsCount} videos
          </div>
        </div>
      </Link>
      <h2 className="text-sm font-medium my-2">{playlist.snippet?.title}</h2>
    </div>
  );
}
