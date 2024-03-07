'use client';

import { youtube_v3 } from 'googleapis';
import { Bell, ChevronDown, UserRoundMinus } from 'lucide-react';
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/DropdownMenu';

type Props = {
  channelId?: string | null;
  videoSubscription: youtube_v3.Schema$SubscriptionListResponse;
  subscribeYoutubeChannel: (channelId: string) => Promise<null>;
  deleteYoutubeSubscription: (subscriptionId: string) => Promise<null>;
  className?: string;
};

export default function ChannelSubscribeButton({
  channelId,
  videoSubscription,
  subscribeYoutubeChannel,
  deleteYoutubeSubscription,
  className,
}: Props) {
  const [isSubscribed, setIsSubscribed] = useState(videoSubscription.items!.length! > 0);

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!isSubscribed && channelId) {
      setIsSubscribed(true);
      await subscribeYoutubeChannel(channelId);
    }
  };

  const handleUnsubscribe = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (isSubscribed) {
      setIsSubscribed(false);
      await deleteYoutubeSubscription(videoSubscription.items![0].id!);
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center">
        {!isSubscribed && (
          <button type="button" onClick={handleSubscribe}>
            <div className="bg-black py-2 px-3 text-white rounded-full text-sm font-bold">Subscribe</div>
          </button>
        )}
        {isSubscribed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button">
                <div className="bg-gray-100 flex items-center gap-2 shadow-md py-2 px-3 text-black rounded-full text-sm font-bold">
                  <Bell size={20} strokeWidth={1.5} />
                  Subscribed
                  <ChevronDown size={20} strokeWidth={1.5} />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-xl py-2 px-0 z-50">
              <DropdownMenuItem className="w-full pl-5 pr-10 font-medium" onClick={handleUnsubscribe}>
                <UserRoundMinus size={20} strokeWidth={1.5} className="mr-3" /> Unsubscribe
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
