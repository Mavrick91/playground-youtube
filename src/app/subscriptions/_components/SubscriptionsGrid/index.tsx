'use client';

import React from 'react';
import { getSubscriptionList } from '~/services/subscriptions';
import { useInfiniteQuery } from '@tanstack/react-query';
import Button from '~/components/shared/Button';
import SubscriptionCard from '../SubscriptionCard';

export type ApiParams = {
  order: string;
  mine?: boolean;
  myRecentSubscribers?: boolean;
  mySubscribers?: boolean;
};

type SubscriptionsGridProps = {
  queryKey: string[];
  apiParams: ApiParams;
};

function SubscriptionsGrid({ queryKey, apiParams }: SubscriptionsGridProps) {
  const {
    data: subscriptions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = '' }) => getSubscriptionList({ ...apiParams, pageToken: pageParam }),
    getNextPageParam: lastPage => lastPage.nextPageToken ?? undefined,
    initialPageParam: '',
  });

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions?.pages
          .flatMap(page => page.items)
          .map(subscription => <SubscriptionCard subscription={subscription} key={subscription?.id} />)}
      </div>

      {hasNextPage && (
        <Button isLoading={isFetchingNextPage} className="my-10" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
}

export default SubscriptionsGrid;
