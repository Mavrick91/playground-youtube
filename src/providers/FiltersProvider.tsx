'use client';

import React, { createContext, useContext, useState } from 'react';
import { FilterCategory, FilterCountry, FilterLocation } from '~/types/filters';

type FiltersState = {
  category: FilterCategory | null;
  country: FilterCountry | null;
  location: FilterLocation | null;
};

type FiltersContextType = {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  resetFilters: () => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

const INITIAL_STATE: FiltersState = {
  category: null,
  country: null,
  location: null,
};

type Props = {
  children: React.ReactNode;
};

export const FiltersProvider = ({ children }: Props) => {
  const [filters, setFilters] = useState<FiltersState>(INITIAL_STATE);

  const resetFilters = () => {
    setFilters(INITIAL_STATE);
  };

  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
