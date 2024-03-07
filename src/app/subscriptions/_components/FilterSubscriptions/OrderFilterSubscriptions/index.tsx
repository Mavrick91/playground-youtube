'use client';

import React, { useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/DropdownMenu';
import Button from '~/components/shared/Button';
import Tooltip from '~/components/shared/Tooltip';
import { SUBSCRIPTIONS_ORDER_OPTIONS } from '~/constants/order';
import { activeFilterButton } from '~/constants/style';
import useQueryParams from '~/hooks/useUpdateQueryParams';

export default function OrderFilterSubscriptions() {
  const { updateQueryParams, getQueryParam } = useQueryParams();

  const handleUpdateDuration = useCallback(
    (value: string | null) => {
      updateQueryParams('order', value);
    },
    [updateQueryParams]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" {...activeFilterButton(!!getQueryParam('order'))}>
          Order
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="overflow-visible">
        {SUBSCRIPTIONS_ORDER_OPTIONS.map(order => (
          <DropdownMenuItem key={order.value} onClick={() => handleUpdateDuration(order.value)}>
            {order.label}
            <Tooltip tip={order.tooltip} />
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleUpdateDuration(null)} asChild>
          <Button className="w-full" size="sm" variant="link">
            Reset
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
