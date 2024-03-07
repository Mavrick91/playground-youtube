'use client';

import React from 'react';
import Button from '~/components/shared/Button';
import { activeFilterButton } from '~/constants/style';
import useQueryParams from '~/hooks/useUpdateQueryParams';

function MyRecentFilterSubscriptions() {
  const { updateQueryParams, getQueryParam } = useQueryParams();
  const isActive = !!getQueryParam('myRecentSubscribers');

  const handleClickRecentSubscribers = () => {
    if (isActive) {
      updateQueryParams('myRecentSubscribers', null);
    } else {
      updateQueryParams({
        myRecentSubscribers: 'true',
        mySubscribers: null,
      });
    }
  };

  return (
    <Button variant="outline" {...activeFilterButton(isActive)} onClick={handleClickRecentSubscribers}>
      My recent subscribers
    </Button>
  );
}

export default MyRecentFilterSubscriptions;
