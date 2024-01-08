'use client';

import React from 'react';
import { useCallback, useEffect } from 'react';
import { useSearchVideo } from '~/endpoint/useSearchVideo';
import { useFilters } from '~/providers/FiltersProvider';
import { Filters } from '~/types/filters';
import Bubble from '../Bubble';
import CategoryFilter from './CategoryFilter';
import CountryFilter from './CountryFilter';

type Props = {
  clearSearchInput: () => void;
};

export default function SearchFilters({ clearSearchInput }: Props) {
  const { filters, setFilters } = useFilters();

  const { refetch } = useSearchVideo({
    topicId: filters.category?.id,
    regionCode: filters.country?.id,
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

  const labelsToDisplay = Object.keys(filters)
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

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const displayFilters = Object.values(filters).some(Boolean);

  return (
    <div className="mb-5">
      <h2 className="text-gray-600 font-medium mb-4">
        {displayFilters ? (
          <div className="flex gap-2 items-center">
            <span>Filters: </span>
            {labelsToDisplay}
          </div>
        ) : (
          'Filters'
        )}
      </h2>
      <div className="flex gap-3">
        <CategoryFilter updateFilter={updateFilter('category')} />
        <CountryFilter updateFilter={updateFilter('country')} />
      </div>
    </div>
  );
}
