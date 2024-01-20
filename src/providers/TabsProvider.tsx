'use client';

import React, { createContext, useState, useMemo, useContext } from 'react';

type Tabs = 'home' | 'videos' | 'shorts' | 'live' | 'playlist' | 'community' | 'shop';
type TabsContextType = [Tabs, React.Dispatch<React.SetStateAction<Tabs>>];

export const TabsContext = createContext<TabsContextType>(['home', () => {}]);

type Props = {
  children: React.ReactNode;
};

export function TabsProvider({ children }: Props) {
  const [activeTab, setActiveTab] = useState<Tabs>('home');

  const value = useMemo<TabsContextType>(() => [activeTab, setActiveTab], [activeTab]);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};
