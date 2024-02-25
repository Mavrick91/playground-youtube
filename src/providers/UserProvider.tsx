'use client';

import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useIsAuthenticated } from '~/endpoint/useIsAuthenticated';
import { useIsMe } from '~/endpoint/useIsMe';
import ClipLoader from 'react-spinners/ClipLoader';
import { User } from '@prisma/client';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const { data: dataAuth, isLoading: isAuthLoading } = useIsAuthenticated();
  const { data: dataMe, isLoading: isMeLoading } = useIsMe(dataAuth?.isAuthenticated);

  useEffect(() => {
    if (dataMe) {
      setUser(dataMe);
    }
  }, [dataMe]);

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
