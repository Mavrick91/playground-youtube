'use client';

import { Repeat, Shuffle } from 'lucide-react';
import { toast } from 'react-toastify';
import { usePlaylistControl } from '~/providers/PlaylistControlProvider';
import { usePlaylist } from '~/providers/PlaylistProvider';
import { useEffect } from 'react';

type Props = {
  playlistTitle: string;
  channelTitle: string;
  videosCount: number;
  videoIds?: string[];
};

export enum ButtonType {
  REPEAT = 'repeat',
  SHUFFLE = 'shuffle',
}

export default function PlaylistVideoHeader({ playlistTitle, channelTitle, videosCount, videoIds }: Props) {
  const { isShuffling, toggleShuffle, toggleRepeat, isRepeating } = usePlaylistControl();
  const { setPlaylist } = usePlaylist();

  const handleButtonClick = (buttonType: ButtonType) => {
    let toastMessage: string = '';

    if (buttonType === ButtonType.REPEAT) {
      toggleRepeat();
      toastMessage = isRepeating ? 'Mode loop deactivated!' : 'Mode loop activated!';
    } else if (buttonType === ButtonType.SHUFFLE) {
      toggleShuffle();
      toastMessage = isShuffling ? 'Shuffle mode deactivated!' : 'Shuffle mode activated!';
    }

    toast(toastMessage, {
      hideProgressBar: true,
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (videoIds && videoIds.length > 0) setPlaylist(videoIds);
  }, [setPlaylist, videoIds]);

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold truncate">{playlistTitle}</h2>
      </div>
      <div className="text-xs text-gray-800 pt-1">
        {channelTitle} - <span className="text-gray-500">1/{videosCount}</span>
      </div>
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          aria-label={ButtonType.REPEAT}
          className="aspect-square p-1 hover:rounded-full hover:bg-black/10"
          onClick={() => handleButtonClick(ButtonType.REPEAT)}
        >
          <Repeat width={20} height={20} strokeWidth={isRepeating ? 2.5 : 1.5} />
        </button>
        <button
          type="button"
          aria-label={ButtonType.SHUFFLE}
          className="aspect-square p-1 hover:rounded-full hover:bg-black/10"
          onClick={() => handleButtonClick(ButtonType.SHUFFLE)}
        >
          <Shuffle width={20} height={20} strokeWidth={isShuffling ? 2.5 : 1.5} />
        </button>
      </div>
    </div>
  );
}
