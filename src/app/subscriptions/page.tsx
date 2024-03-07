import React from 'react';
import { getSubscriptionList } from '~/services/subscriptions';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import SubscriptionsGrid from '~/app/subscriptions/_components/SubscriptionsGrid';
import { SUBSCRIPTIONS_ORDER_OPTIONS } from '~/constants/order';
import FilterSubscriptions from '~/app/subscriptions/_components/FilterSubscriptions';

type ApiParams = {
  order: string;
  mine?: boolean;
  myRecentSubscribers?: boolean;
  mySubscribers?: boolean;
};

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
  const apiParams = buildApiParams(searchParams);
  const subscriptions = await getSubscriptionList(apiParams);

  return (
    <MaxWidthWrapper>
      <FilterSubscriptions />

      <SubscriptionsGrid subscriptions={subscriptions || []} />
    </MaxWidthWrapper>
  );
}

export default subscriptionsPage;
