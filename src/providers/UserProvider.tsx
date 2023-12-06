'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, onAuthStateChanged } from '~/services/firebase';

interface User {
  email: string;
  signIn: boolean;
}

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        console.log('🚀 ~ unsubscribe ~ firebaseUser:', firebaseUser);
        setUser({
          email: firebaseUser.email!,
          signIn: true,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
