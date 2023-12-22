'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, auth, onAuthStateChanged } from '~/services/firebase';

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (
        (firebaseUser && firebaseUser.emailVerified) ||
        pathname.includes('/auth/action')
      ) {
        console.log('🚀 ~ unsubscribe ~ firebaseUser:', firebaseUser);
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname]);

  if (loading) {
    return null;
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
