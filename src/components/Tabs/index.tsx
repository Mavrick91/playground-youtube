'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CHANNEL_TABS } from '~/constants/channe_tabs';
import { cn } from '~/lib/utils';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Separator } from '../Separator';

type Tabs = 'featured' | 'videos' | 'shorts' | 'live' | 'playlist' | 'shop';

type Props = {
  channelId?: string | null;
};

export default function Tabs({ channelId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentTab] = pathname.split('/').slice(-1);
  const [activeTab, setActiveTab] = useState<Tabs>(currentTab as Tabs);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const currentRef = stickyRef.current;

    if (currentRef && currentRef.parentElement) {
      const parentDiv = currentRef.parentElement;

      const checkScroll = () => {
        const rect = currentRef.getBoundingClientRect();
        if (rect.top <= 60) {
          currentRef.classList.add('blurry-background');
        } else {
          currentRef.classList.remove('blurry-background');
        }
      };

      parentDiv.addEventListener('scroll', checkScroll);

      return () => {
        parentDiv.removeEventListener('scroll', checkScroll);
      };
    }

    return undefined;
  }, []);

  useEffect(() => {
    const activeTabElement = activeTabRef.current;
    const borderElement = borderRef.current;

    if (activeTabElement && borderElement) {
      borderElement.style.width = `${activeTabElement.offsetWidth}px`;
      borderElement.style.transform = `translateX(${activeTabElement.offsetLeft}px)`;
    }
  }, [activeTab]);

  const handleClickTab = (tab: Tabs) => {
    setActiveTab(tab);
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
                className={cn('text-black py-5 font-bold', {
                  'text-opacity-100': activeTab === tab.id,
                  'text-opacity-50': activeTab !== tab.id,
                })}
                key={tab.title}
                onClick={() => handleClickTab(tab.id)}
                ref={activeTab === tab.id ? activeTabRef : null}
              >
                {tab.title}
              </button>
            ))}
            <div
              className="absolute bottom-0 left-0 h-1 bg-black transition-all duration-200 ease-out"
              ref={borderRef}
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <Separator />
      <div />
    </div>
  );
}
