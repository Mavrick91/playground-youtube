'use client';

import { useCallback, useEffect, useRef } from 'react';
import { CHANNEL_TABS } from '~/constants/channel_tabs';
import { cn } from '~/lib/utils';
import Link from 'next/link';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Separator } from '../Separator';

export type TabIds = 'videos' | 'playlist';

type Props = {
  channelId?: string | null;
  activeTab: TabIds;
};

export default function Tabs({ channelId, activeTab }: Props) {
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

  return (
    <div ref={stickyRef} className="sticky top-0 z-20">
      <MaxWidthWrapper>
        <div className="mt-1">
          <div className="relative flex items-center gap-5">
            {CHANNEL_TABS.map(tab => (
              <Link
                href={`/channel/${channelId}/${tab.id}`}
                className={cn('text-black py-5 font-bold relative', {
                  'text-opacity-100': activeTab === tab.id,
                  'text-opacity-50': activeTab !== tab.id,
                })}
                key={tab.title}
              >
                {tab.title}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-black transition-all duration-200 ease-out" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
      <Separator />
      <div />
    </div>
  );
}
