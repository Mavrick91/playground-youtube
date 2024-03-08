'use client';

import { youtube_v3 } from 'googleapis';
import ClientImage from '~/components/ClientImage';
import ChannelSubscribeButton from '~/components/shared/ChannelSubscribeButton';
import { descriptionElements } from '~/lib/string';
import { formatNumber } from '~/lib/utils';
import { deleteYoutubeSubscription, subscribeYoutubeChannel } from '~/services/channelService';
import { useUser } from '~/providers/UserProvider';

type ChannelInfoProps = {
  channel?: youtube_v3.Schema$Channel;
  videoSubscription: youtube_v3.Schema$SubscriptionListResponse;
};

export default function ChannelInfo({ channel, videoSubscription }: ChannelInfoProps) {
  const { user } = useUser();

  return (
    <div className="pt-4 flex items-center">
      <div className="relative h-24 lg:h-40 aspect-square mr-6">
        <ClientImage
          src={channel?.snippet?.thumbnails?.high?.url || ''}
          alt="channel banner"
          className="w-full rounded-full"
          fill
        />
      </div>
      <div className="flex flex-col gap-2 w-full lg:w-1/2 ">
        <div className="font-bold text-2xl lg:text-4xl mb-1">{channel?.snippet?.title}</div>
        <div className="text-gray-600 text-sm mb-1">
          <span>{channel?.snippet?.customUrl}</span> ‧{' '}
          <span>{formatNumber(channel?.statistics?.subscriberCount as string)} Subscriber ‧ </span>
          <span>{formatNumber(channel?.statistics?.videoCount as string)} videos</span>
        </div>
        <div className="text-gray-600 text-sm mb-3 line-clamp-4">
          {descriptionElements(channel?.snippet?.description || '')}
        </div>
        {user?.id !== channel?.id && (
          <ChannelSubscribeButton
            channelId={channel?.id}
            subscribeYoutubeChannel={subscribeYoutubeChannel}
            deleteYoutubeSubscription={deleteYoutubeSubscription}
            videoSubscription={videoSubscription}
          />
        )}
      </div>
    </div>
  );
}
