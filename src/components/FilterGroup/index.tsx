'use client';

import React, { useMemo } from 'react';
import { useCallback, useEffect } from 'react';
import { useSearchVideo } from '~/endpoint/useSearchVideo';
import { useFilters } from '~/providers/FiltersProvider';
import { Filters } from '~/types/filters';
import Bubble from '../Bubble';
import CategoryFilter from './CategoryFilter';
import CountryFilter from './CountryFilter';
import LocationFilter from './LocationFilter';
import Select from '../shared/Select';

type Props = {
  clearSearchInput: () => void;
};

const options = [
  { value: 'date', label: 'Date' },
  { value: 'rating', label: 'Rating' },
  { value: 'relevance', label: 'Relevance' },
  { value: 'title', label: 'Title' },
  { value: 'videoCount', label: 'Video count' },
  { value: 'viewCount', label: 'View count' },
];

export default function FilterGroup({ clearSearchInput }: Props) {
  const { filters, setFilters } = useFilters();

  const { refetch } = useSearchVideo({
    topicId: filters.category?.id,
    regionCode: filters.country?.id,
    location: `${filters.location?.lat}, ${filters.location?.lng}`,
    radius: filters.location?.radius,
  });

  const updateFilter = useCallback(
    (key: string) => {
      return (value: Filters | null) => {
        setFilters(prevState => ({
          ...prevState,
          [key]: value,
        }));
        clearSearchInput();
      };
    },
    [clearSearchInput, setFilters]
  );

  const labelsToDisplay = useMemo(() => {
    return Object.keys(filters)
      .map(key => {
        const value = filters[key as keyof typeof filters];

        if (!value || !value.label) return null;

        return {
          key,
          label: value.label,
        };
      })
      .filter((item): item is { key: string; label: string } => item !== null)
      .map(item => (
        <Bubble key={item.key} onClick={() => updateFilter(item.key)(null)}>
          {item.label}
        </Bubble>
      ));
  }, [filters, updateFilter]);

  const displayFilters = Object.values(filters).some(Boolean);

  useEffect(() => {
    if (labelsToDisplay) refetch();
  }, [labelsToDisplay, refetch]);

  return (
    <div className="mb-5">
      <h2 className="text-gray-600 font-medium mb-4">
        <div className="h-7 flex items-center">
          {displayFilters ? (
            <div className="flex gap-2 items-center">
              <span>Filters: </span>
              {labelsToDisplay}
            </div>
          ) : (
            'Filters'
          )}
        </div>
      </h2>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <CategoryFilter updateFilter={updateFilter('category')} />
          <CountryFilter updateFilter={updateFilter('country')} />
          <LocationFilter updateFilter={updateFilter('location')} />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-gray-600 font-medium">Order by:</div>{' '}
          <div className="w-40">
            <Select options={options} defaultValue={options[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
