'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext<any | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  if (loading) {
    return null;
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
