import React from 'react';
import { youtube_v3 } from 'googleapis';
import SubscriptionCard from '../SubscriptionCard';

type SubscriptionsGridProps = {
  subscriptions?: youtube_v3.Schema$SubscriptionListResponse;
};

function SubscriptionsGrid({ subscriptions }: SubscriptionsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {subscriptions?.items &&
        subscriptions.items.map(subscription => <SubscriptionCard subscription={subscription} key={subscription.id} />)}
    </div>
  );
}

export default SubscriptionsGrid;
