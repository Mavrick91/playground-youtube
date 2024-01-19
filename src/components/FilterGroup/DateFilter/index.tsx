'use client';

import React, { useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import Button from '~/components/shared/Button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/shared/Popover';
import { Calendar } from '~/components/shared/Popover/Calendar';
import { arePublishedDatesValid, cn } from '~/lib/utils';
import useUpdateQueryParams from '~/hooks/useUpdateQueryParams';

export default function DateFilter({ className }: { className?: string }) {
  const { updateQueryParams, getQueryParam } = useUpdateQueryParams();

  const [publishedAfter, setPublishedAfter] = React.useState<Date | undefined>();
  const [publishedBefore, setPublishedBefore] = React.useState<Date | undefined>();

  useEffect(() => {
    const after = getQueryParam('publishedAfter');
    const before = getQueryParam('publishedBefore');

    if (arePublishedDatesValid(after, before)) {
      if (after) setPublishedAfter(new Date(decodeURIComponent(after)));
      if (before) setPublishedBefore(new Date(decodeURIComponent(before)));
    } else {
      setPublishedAfter(undefined);
      setPublishedBefore(undefined);
    }
  }, [getQueryParam]);

  const handleClickFilterDate = useCallback(() => {
    const newParams: Record<string, string | null> = {};

    newParams.publishedAfter = publishedAfter ? publishedAfter.toISOString().slice(0, 10) : null;
    newParams.publishedBefore = publishedBefore ? publishedBefore.toISOString().slice(0, 10) : null;

    updateQueryParams(newParams);
  }, [publishedAfter, publishedBefore, updateQueryParams]);

  return (
    <div className="flex gap-3 items-center">
      <div className={cn('grid gap-2 grid-cols-2', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="publishedAfter"
              variant="outline"
              disabled={getQueryParam('order') === 'videoCount'}
              className={cn(
                'w-[170px] justify-start text-left font-normal',
                !publishedAfter && 'text-muted-foreground'
              )}
            >
              <CalendarIcon strokeWidth={1.5} className="mr-2 h-4 w-4 shrink-0" />
              {publishedAfter ? format(publishedAfter, 'LLL dd, y') : <span>Published After</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={publishedAfter}
              selected={publishedAfter}
              onSelect={setPublishedAfter}
              numberOfMonths={1}
              modifiers={{
                disabled: {
                  after: publishedBefore || new Date(),
                },
              }}
            />
            <div className="px-3 pb-3">
              <Button className="w-full mx-auto" size="sm" variant="ghost" onClick={() => setPublishedAfter(undefined)}>
                Reset
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="publishedBefore"
              variant="outline"
              disabled={getQueryParam('order') === 'videoCount'}
              className={cn(
                'w-[170px] justify-start text-left font-normal',
                !publishedBefore && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
              {publishedBefore ? format(publishedBefore, 'LLL dd, y') : <span>Published Before</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={publishedBefore}
              selected={publishedBefore}
              onSelect={setPublishedBefore}
              numberOfMonths={1}
              modifiers={{
                disabled: {
                  before: publishedAfter,
                  after: new Date(),
                },
              }}
            />
            <div className="px-3 pb-3">
              <Button
                className="w-full mx-auto"
                size="sm"
                variant="ghost"
                onClick={() => setPublishedBefore(undefined)}
              >
                Reset
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={handleClickFilterDate}>Filter by date</Button>
    </div>
  );
}
