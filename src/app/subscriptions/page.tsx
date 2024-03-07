import React from 'react';
import { getSubscriptionList } from '~/services/subscriptions';
import Button from '~/components/shared/Button';
import ClientImage from '~/components/ClientImage';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import Link from 'next/link';

async function subscriptionsPage() {
  const subscriptions = await getSubscriptionList({
    mine: true,
  });

  if (!subscriptions.items) {
    return <div>Loading...</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-3 gap-6 p-4">
        {subscriptions.items.map(subscription => (
          <Link
            href={`/channel/${subscription.snippet?.resourceId?.channelId}`}
            key={subscription.id}
            className="flex gap-3 items-center bg-white hover:bg-purple-100 p-4 transition-colors rounded-lg shadow-md space-y-2"
          >
            <ClientImage
              alt="Channel 1"
              className="rounded-full shadow-sm"
              height={100}
              src={subscription.snippet?.thumbnails?.high?.url || ''}
              style={{
                aspectRatio: '100/100',
                objectFit: 'cover',
              }}
              width={100}
            />
            <div>
              <div className="flex flex-col shrink grow gap-1">
                <h3 className="text-lg font-semibold leading-none">{subscription.snippet?.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">{subscription.snippet?.description}</p>
              </div>
              <Button className="mt-4" size="sm">
                Subscribe
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

export default subscriptionsPage;
