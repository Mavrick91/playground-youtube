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
import { VIDEO_DURATION_OPTIONS } from '~/constants/duration';
import { activeFilterButton } from '~/constants/style';
import useQueryParams from '~/hooks/useUpdateQueryParams';

export default function DurationFilter() {
  const { updateQueryParams, getQueryParam } = useQueryParams();

  const handleUpdateDuration = useCallback(
    (value: string | null) => {
      updateQueryParams('videoDuration', value);
    },
    [updateQueryParams]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={getQueryParam('order') === 'videoCount'}
          {...activeFilterButton(!!getQueryParam('videoDuration'))}
        >
          Duration
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="overflow-visible">
        {VIDEO_DURATION_OPTIONS.map(duration => (
            <DropdownMenuItem key={duration.value} onClick={() => handleUpdateDuration(duration.value)}>
              {duration.label}
              <Tooltip tip={duration.tooltip} />
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
