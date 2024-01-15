'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useIsAuthenticated } from '~/endpoint/useIsAuthenticated';
import { useIsMe } from '~/endpoint/useIsMe';
import ClipLoader from 'react-spinners/ClipLoader';

interface User {
  displayName: string;
  picture: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: isAuthenticated, isLoading: isAuthLoading } = useIsAuthenticated();
  const { data: isMe, isLoading: isMeLoading } = useIsMe(isAuthenticated?.isAuthenticated);

  useEffect(() => {
    if (isMe) {
      setUser({
        displayName: isMe.names[0].displayName,
        picture: isMe.photos[0].url,
      });
    }
  }, [isMe]);

  if (isAuthLoading || isMeLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <ClipLoader size={150} />
      </div>
    );
  }

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
