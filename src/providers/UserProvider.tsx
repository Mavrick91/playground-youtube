'use client';

import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useIsAuthenticated } from '~/endpoint/useIsAuthenticated';
import { useIsMe } from '~/endpoint/useIsMe';
import ClipLoader from 'react-spinners/ClipLoader';
import { youtube_v3 } from 'googleapis';

interface UserContextType {
  user: youtube_v3.Schema$Channel | null;
  setUser: React.Dispatch<React.SetStateAction<youtube_v3.Schema$Channel | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<youtube_v3.Schema$Channel | null>(null);
  const { data: isAuthenticated, isLoading: isAuthLoading } = useIsAuthenticated();
  const { data: isMe, isLoading: isMeLoading } = useIsMe(isAuthenticated?.isAuthenticated);
  console.log('🚀 ~ UserProvider ~ isMe:', isMe);

  useEffect(() => {
    if (isMe && isMe.items && isMe.items.length > 0) {
      setUser(isMe.items[0]);
    }
  }, [isMe]);

  const value = useMemo(() => ({ user, setUser }), [user]);

  if (isAuthLoading || isMeLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <ClipLoader size={150} />
      </div>
    );
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
