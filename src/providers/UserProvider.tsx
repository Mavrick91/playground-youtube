'use client';

import axios from 'axios';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useIsAuthenticated } from '~/endpoint/useIsAuthenticated';
import { useIsMe } from '~/endpoint/useIsMe';

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
  const { isAuthenticated, isLoading: isAuthLoading } = useIsAuthenticated();
  const { isMe, isLoading: isMeLoading } = useIsMe(isAuthenticated);

  useEffect(() => {
    if (isMe) {
      setUser({
        displayName: isMe.names[0].displayName,
        picture: isMe.photos[0].url,
      });
    }
  }, [isMe]);

  if (isAuthLoading || isMeLoading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
