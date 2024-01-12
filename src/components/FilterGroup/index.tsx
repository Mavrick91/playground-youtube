'use client';

import React from 'react';
import Select from '../shared/Select';
import CategoryFilter from './CategoryFilter';
import CountryFilter from './CountryFilter';
import LocationFilter from './LocationFilter';
import DateFilter from './DateFilter';

const options = [
  { value: 'date', label: 'Date' },
  { value: 'rating', label: 'Rating' },
  { value: 'relevance', label: 'Relevance' },
  { value: 'title', label: 'Title' },
  { value: 'videoCount', label: 'Video count' },
  { value: 'viewCount', label: 'View count' },
];

export default function FilterGroup() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <CategoryFilter />
          <CountryFilter />
          <LocationFilter />
        </div>
        <DateFilter />
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-gray-600 font-medium">Order by:</div>{' '}
        <div className="w-40">
          <Select options={options} defaultValue={options[0]} />
        </div>
      </div>
    </div>
  );
}
