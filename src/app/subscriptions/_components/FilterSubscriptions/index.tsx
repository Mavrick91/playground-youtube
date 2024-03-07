import React from 'react';
import OrderFilterSubscriptions from './OrderFilterSubscriptions';
import MyRecentFilterSubscriptions from './MyRecentFilterSubscriptions';
import MySubscribersFilterSubscriptions from './MySubscribersFilterSubscriptions';

function FilterSubscriptions() {
  return (
    <div className="my-5 flex gap-3">
      <OrderFilterSubscriptions />
      <MyRecentFilterSubscriptions />
      <MySubscribersFilterSubscriptions />
    </div>
  );
}

export default FilterSubscriptions;
