'use client';

import React, { createContext, useContext, useState } from 'react';
import { Category } from '~/types/category';

type FiltersState = {
  category: Category | null;
};

type FiltersContextType = {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  resetFilters: () => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

const INITIAL_STATE: FiltersState = {
  category: null,
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
