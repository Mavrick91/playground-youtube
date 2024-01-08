'use client';

import React, { useCallback, useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import { Category } from '~/types/category';
import { useSearchVideo } from '~/endpoint/useSearchVideo';
import { useFilters } from '~/providers/FiltersProvider';

type Props = {
  clearSearchInput: () => void;
};

export default function SearchFilters({ clearSearchInput }: Props) {
  const { filters, setFilters } = useFilters();

  const { refetch } = useSearchVideo({
    topicId: filters.category?.id,
  });

  const updateCategory = useCallback(
    (category: Category) => {
      setFilters(prevState => ({
        ...prevState,
        category: category,
      }));
      clearSearchInput();
    },
    [clearSearchInput, setFilters]
  );

  useEffect(() => {
    refetch();
  }, [filters.category, refetch]);

  return (
    <div className="mb-5">
      <h2 className="text-gray-600 font-medium mb-4">
        {filters.category ? `Filters: ${filters.category.label}` : 'Filters'}
      </h2>
      <CategoryFilter updateCategory={updateCategory} />
    </div>
  );
}
