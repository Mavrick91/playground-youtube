import React from 'react';
import ClientImage from '~/components/ClientImage';
import { youtube_v3 } from 'googleapis';
import ChannelSubscribeButton from '~/components/shared/ChannelSubscribeButton';
import { deleteYoutubeSubscription, subscribeYoutubeChannel } from '~/services/channelService';
import { useUser } from '~/providers/UserProvider';
import Link from 'next/link';

type SubscriptionCardProps = {
  subscription?: youtube_v3.Schema$Subscription;
};

function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const { user } = useUser();

  return (
    <Link
      href={`/channel/${subscription?.snippet?.resourceId?.channelId}`}
      key={subscription?.id}
      className="flex gap-3 text-left items-center bg-white hover:bg-purple-100 p-4 transition-colors rounded-lg shadow-md space-y-2"
    >
      <ClientImage
        alt={subscription?.snippet?.title || 'Subscriber avatar'}
        className="rounded-full shadow-sm"
        height={100}
        src={subscription?.snippet?.thumbnails?.high?.url || ''}
        style={{
          aspectRatio: '100/100',
          objectFit: 'cover',
        }}
        width={100}
      />
      <div className="min-w-0">
        <div className="flex flex-col shrink grow gap-1">
          <h3 className="text-lg font-semibold leading-none">{subscription?.snippet?.title}</h3>
          {subscription?.snippet?.description && (
            <p className="text-sm text-gray-500 whitespace-pre-wrap truncate line-clamp-2 min-h-[40px]">
              {subscription?.snippet?.description}
            </p>
          )}
        </div>
        {user?.id !== subscription?.snippet?.resourceId?.channelId && (
          <ChannelSubscribeButton
            className="mt-4"
            channelId={subscription?.snippet?.resourceId?.channelId}
            videoSubscription={{ items: [subscription!] }}
            subscribeYoutubeChannel={subscribeYoutubeChannel}
            deleteYoutubeSubscription={deleteYoutubeSubscription}
          />
        )}
      </div>
    </Link>
  );
}

export default SubscriptionCard;
