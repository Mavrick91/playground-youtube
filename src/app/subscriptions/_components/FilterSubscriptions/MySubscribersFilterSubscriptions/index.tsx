'use client';

import React from 'react';
import Button from '~/components/shared/Button';
import { activeFilterButton } from '~/constants/style';
import useQueryParams from '~/hooks/useUpdateQueryParams';

function MySubscribersFilterSubscriptions() {
  const { updateQueryParams, getQueryParam } = useQueryParams();
  const isActive = !!getQueryParam('mySubscribers');

  const handleClickMySubscribers = () => {
    if (isActive) {
      updateQueryParams('mySubscribers', null);
    } else {
      updateQueryParams({
        myRecentSubscribers: null,
        mySubscribers: 'true',
      });
    }
  };

  return (
    <Button variant="outline" {...activeFilterButton(isActive)} onClick={handleClickMySubscribers}>
      My subscribers
    </Button>
  );
}

export default MySubscribersFilterSubscriptions;
