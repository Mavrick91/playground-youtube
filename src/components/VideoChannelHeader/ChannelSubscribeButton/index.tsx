'use client';

import { youtube_v3 } from 'googleapis';
import { Bell, ChevronDown, UserRoundMinus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/DropdownMenu';
import { formatNumber } from '~/lib/utils';

type Props = {
  video: youtube_v3.Schema$Video;
  channel?: youtube_v3.Schema$Channel;
  videoSubscription: youtube_v3.Schema$SubscriptionListResponse;
  subscribeYoutubeChannel: (channelId: string) => Promise<youtube_v3.Schema$Subscription>;
  deleteYoutubeSubscription: (subscriptionId: string) => Promise<void>;
};

export default function ChannelSubscribeButton({
  video,
  channel,
  videoSubscription,
  subscribeYoutubeChannel,
  deleteYoutubeSubscription,
}: Props) {
  const [isSubscribed, setIsSubscribed] = useState(!!(videoSubscription.items!.length! > 0));

  const handleSubscribe = async () => {
    if (!isSubscribed) {
      setIsSubscribed(true);
      await subscribeYoutubeChannel(video.snippet!.channelId as string);
    }
  };

  const handleUnsubscribe = async () => {
    if (isSubscribed) {
      setIsSubscribed(false);
      await deleteYoutubeSubscription(videoSubscription.items![0].id!);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          src={channel?.snippet?.thumbnails?.high?.url || ''}
          alt="channel"
          className="rounded-full"
          width={36}
          height={36}
          quality={100}
        />
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-black font-bold">{video?.snippet?.channelTitle}</span>
            <span className="text-xs text-gray-700 font-medium">
              {formatNumber(channel?.statistics?.subscriberCount || '')} subscribers
            </span>
          </div>
          {!isSubscribed && (
            <button type="button" className="ml-6" onClick={handleSubscribe}>
              <div className="bg-black py-2 px-3 text-white rounded-full text-sm font-bold">Subscribe</div>
            </button>
          )}
          {isSubscribed && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="ml-6 ">
                  <div className="bg-gray-100 flex items-center gap-2 shadow-md py-2 px-3 text-black rounded-full text-sm font-bold">
                    <Bell size={20} strokeWidth={1.5} />
                    Subscribed
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl py-2 px-0">
                <DropdownMenuItem className="w-full pl-5 pr-10 font-medium" onClick={handleUnsubscribe}>
                  <UserRoundMinus size={20} strokeWidth={1.5} className="mr-3" /> Unsubscribe
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}
