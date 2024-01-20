'use client';

import { useEffect, useRef } from 'react';
import { CHANNEL_TABS } from '~/constants/channe_tabs';
import { cn } from '~/lib/utils';
import { useTabs } from '~/providers/TabsProvider';

export default function Tabs() {
  const [activeTab, setActiveTab] = useTabs();
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabElement = activeTabRef.current;
    const borderElement = borderRef.current;

    if (activeTabElement && borderElement) {
      borderElement.style.width = `${activeTabElement.offsetWidth}px`;
      borderElement.style.transform = `translateX(${activeTabElement.offsetLeft}px)`;
    }
  }, [activeTab]);

  return (
    <div className="relative flex items-center gap-5">
      {CHANNEL_TABS.map(tab => (
        <button
          type="button"
          className={cn('text-black py-5 font-bold', {
            'text-opacity-100': activeTab === tab.id,
            'text-opacity-50': activeTab !== tab.id,
          })}
          key={tab.title}
          onClick={() => setActiveTab(tab.id)}
          ref={activeTab === tab.id ? activeTabRef : null}
        >
          {tab.title}
        </button>
      ))}
      <div className="absolute bottom-0 left-0 h-1 bg-black transition-all duration-200 ease-out" ref={borderRef} />
    </div>
  );
}
