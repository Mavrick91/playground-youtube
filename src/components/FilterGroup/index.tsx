'use client';

import React from 'react';
import CategoryFilter from './CategoryFilter';
import CountryFilter from './CountryFilter';
import LocationFilter from './LocationFilter';
import DateFilter from './DateFilter';
import DurationFilter from './DurationFilter';
import OrderFilter from './OrderFilter';

export default function FilterGroup() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <CategoryFilter />
          <CountryFilter />
          <LocationFilter />
          <DurationFilter />
          <OrderFilter />
        </div>
        <DateFilter />
      </div>
    </div>
  );
}
