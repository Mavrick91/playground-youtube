'use client';

import axios from 'axios';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User {
  displayName: string;
  picture: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

interface GoogleMeResponse {
  names: Array<{ displayName: string }>;
  photos: Array<{ url: string }>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response =
          await axios.get<AuthStatusResponse>('/api/auth/status');

        if (response.data.isAuthenticated) {
          const responseMe =
            await axios.get<GoogleMeResponse>('/api/google/me');
          setUser({
            displayName: responseMe.data.names[0].displayName,
            picture: responseMe.data.photos[0].url,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
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
