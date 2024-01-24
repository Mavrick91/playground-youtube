'use client';

import { useState, useMemo, useCallback, createContext, ReactNode, useContext } from 'react';

type Props = {
  children: ReactNode;
};

type PlaylistControlContextType = {
  isRepeating: boolean;
  toggleRepeat: () => void;
  isShuffling: boolean;
  toggleShuffle: () => void;
};

export const PlaylistControlContext = createContext<PlaylistControlContextType>({
  isRepeating: false,
  toggleRepeat: () => {},
  isShuffling: false,
  toggleShuffle: () => {},
});

export default function PlaylistControlProvider({ children }: Props) {
  const [isRepeating, setIsRepeating] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  const toggleRepeat = useCallback(() => {
    setIsRepeating((prev: boolean) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffling((prev: boolean) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isRepeating,
      toggleRepeat,
      isShuffling,
      toggleShuffle,
    }),
    [isRepeating, toggleRepeat, isShuffling, toggleShuffle]
  );

  return <PlaylistControlContext.Provider value={value}>{children}</PlaylistControlContext.Provider>;
}

export const usePlaylistControl = () => {
  const context = useContext(PlaylistControlContext);

  if (context === undefined) {
    throw new Error('usePlaylistControl must be used within a PlaylistControlProvider');
  }

  return context;
};
