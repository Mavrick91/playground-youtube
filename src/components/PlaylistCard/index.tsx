import { youtube_v3 } from 'googleapis';
import ClientImage from '~/components/ClientImage';

type Props = {
  playlist: youtube_v3.Schema$Playlist;
};

export default function PlaylistCard({ playlist }: Props) {
  return (
    <div>
      <div className="w-full h-[128px] relative">
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
      </div>
      <h2 className="text-sm font-medium my-2">{playlist.snippet?.title}</h2>
    </div>
  );
}
