'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { CHANNEL_TABS } from '~/constants/channe_tabs';
import { cn } from '~/lib/utils';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Separator } from '../Separator';

export type TabIds = 'videos' | 'playlist';

type Props = {
  channelId?: string | null;
  activeTab: TabIds;
};

export default function Tabs({ channelId, activeTab }: Props) {
  const router = useRouter();
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    const currentRef = stickyRef.current;
    if (!currentRef) return;

    const rect = currentRef.getBoundingClientRect();
    if (rect.top <= 60) {
      currentRef.classList.add('blurry-background');
    } else {
      currentRef.classList.remove('blurry-background');
    }
  }, []);

  useEffect(() => {
    const currentRef = stickyRef.current;
    if (currentRef && currentRef.parentElement) {
      const parentDiv = currentRef.parentElement;
      parentDiv.addEventListener('scroll', checkScroll);
      return () => {
        parentDiv.removeEventListener('scroll', checkScroll);
      };
    }
    return undefined;
  }, [checkScroll]);

  const handleClickTab = (tab: TabIds) => {
    router.push(`/channel/${channelId}/${tab}`);
  };

  return (
    <div ref={stickyRef} className="sticky top-0 z-20">
      <MaxWidthWrapper>
        <div className="mt-1">
          <div className="relative flex items-center gap-5">
            {CHANNEL_TABS.map(tab => (
              <button
                type="button"
                className={cn('text-black py-5 font-bold relative', {
                  'text-opacity-100': activeTab === tab.id,
                  'text-opacity-50': activeTab !== tab.id,
                })}
                key={tab.title}
                onClick={() => handleClickTab(tab.id)}
                ref={activeTab === tab.id ? activeTabRef : null}
              >
                {tab.title}
                {activeTab === tab.id && (
                  <div
                    className="absolute bottom-0 inset-x-0 h-1 bg-black transition-all duration-200 ease-out"
                    ref={borderRef}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
      <Separator />
      <div />
    </div>
  );
}
