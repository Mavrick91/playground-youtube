import React from 'react';
import { getSubscriptionList } from '~/services/subscriptions';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import SubscriptionsGrid, { ApiParams } from '~/app/subscriptions/_components/SubscriptionsGrid';
import { SUBSCRIPTIONS_ORDER_OPTIONS } from '~/constants/order';
import FilterSubscriptions from '~/app/subscriptions/_components/FilterSubscriptions';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { youtube_v3 } from 'googleapis';

function buildApiParams(searchParams: Record<string, string>): ApiParams {
  const validOrders = SUBSCRIPTIONS_ORDER_OPTIONS.map(option => option.value);
  const order = validOrders.includes(searchParams.order) ? searchParams.order : 'relevance';
  const myRecentSubscribers = searchParams.myRecentSubscribers === 'true';
  const mySubscribers = searchParams.mySubscribers === 'true';

  const apiParams: ApiParams = { order };

  if (!myRecentSubscribers && !mySubscribers) {
    apiParams.mine = true;
  }

  if (myRecentSubscribers) {
    apiParams.myRecentSubscribers = true;
  }

  if (mySubscribers) {
    apiParams.mySubscribers = true;
  }

  return apiParams;
}

async function subscriptionsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const queryClient = new QueryClient();
  const apiParams = buildApiParams(searchParams);
  const queryKey = ['subscriptions', ...Object.entries(searchParams).flat()];

  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam = '' }) => getSubscriptionList({ ...apiParams, pageToken: pageParam }),
    getNextPageParam: (lastPage: youtube_v3.Schema$SubscriptionListResponse) => lastPage.nextPageToken ?? undefined,
    initialPageParam: '',
  });

  return (
    <>
      <MaxWidthWrapper>
        <FilterSubscriptions />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="overflow-y-auto grow h-0">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SubscriptionsGrid queryKey={queryKey} apiParams={apiParams} />
        </HydrationBoundary>
      </MaxWidthWrapper>
    </>
  );
}

export default subscriptionsPage;
