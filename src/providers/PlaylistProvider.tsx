'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { usePlaylistControl } from '~/providers/PlaylistControlProvider';
import { useRouter, useSearchParams } from 'next/navigation';

type PlaylistContextType = {
  nextVideo: () => void;
  setPlaylist: (playlist: string[]) => void;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

type PlaylistProviderProps = {
  children: ReactNode;
};

export function PlaylistProvider({ children }: PlaylistProviderProps) {
  const router = useRouter();
  const params = useSearchParams();
  const playlistId = params.get('list');
  const currentVideoId = params.get('v');
  const { isShuffling, isRepeating } = usePlaylistControl();
  const [playlist, setPlaylist] = useState<string[]>([]);

  const getRandomVideoIndex = useCallback(
    (currentIndex: number) => {
      let randomVideoIndex = Math.floor(Math.random() * playlist.length);
      while (randomVideoIndex === currentIndex) {
        randomVideoIndex = Math.floor(Math.random() * playlist.length);
      }
      return randomVideoIndex;
    },
    [playlist]
  );

  const getNextVideoId = useCallback(
    (currentIndex: number): string => {
      if (isRepeating && currentIndex === playlist.length - 1) {
        return playlist[0];
      }
      if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
        return playlist[currentIndex + 1];
      }

      return '';
    },
    [playlist, isRepeating]
  );

  const nextVideo = useCallback(() => {
    if (!playlistId) return;

    const currentIndex = playlist.findIndex(videoId => videoId === currentVideoId);

    if (isShuffling) {
      const randomVideoIndex = getRandomVideoIndex(currentIndex);
      router.push(`/watch?v=${playlist[randomVideoIndex]}&list=${playlistId}`);

      return;
    }

    const nextVideoId = getNextVideoId(currentIndex);
    if (nextVideoId) {
      router.push(`/watch?v=${nextVideoId}&list=${playlistId}`);
    }
  }, [playlistId, playlist, isShuffling, getNextVideoId, router, currentVideoId, getRandomVideoIndex]);

  const value = useMemo(
    () => ({
      setPlaylist,
      nextVideo,
    }),
    [nextVideo]
  );

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
}

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};
