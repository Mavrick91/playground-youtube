import React from 'react';
import Link from 'next/link';
import ClientImage from '~/components/ClientImage';
import Button from '~/components/shared/Button';
import { youtube_v3 } from 'googleapis';

type SubscriptionCardProps = {
  subscription?: youtube_v3.Schema$Subscription;
};

function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  return (
    <Link
      href={`/channel/${subscription?.snippet?.resourceId?.channelId}`}
      key={subscription?.id}
      className="flex gap-3 items-center bg-white hover:bg-purple-100 p-4 transition-colors rounded-lg shadow-md space-y-2"
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
      <div>
        <div className="flex flex-col shrink grow gap-1">
          <h3 className="text-lg font-semibold leading-none">{subscription?.snippet?.title}</h3>
          <p className="text-sm text-gray-500 whitespace-pre-wrap truncate line-clamp-2 min-h-[40px]">
            {subscription?.snippet?.description}
          </p>
        </div>
        <Button className="mt-4" size="sm">
          Subscribe
        </Button>
      </div>
    </Link>
  );
}

export default SubscriptionCard;
