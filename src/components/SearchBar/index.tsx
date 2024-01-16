'use client';

import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import useQueryParams from '~/hooks/useUpdateQueryParams';
import { ROUTES } from '~/constants/route';
import Button from '../shared/Button';
import SearchInput from '../shared/SearchInput';

export default function SearchBar() {
  const { updateQueryParams } = useQueryParams({ deleteFilters: true, baseURL: ROUTES.HOME });
  const params = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(params.get('q') || '');
  }, [params]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateQueryParams('q', inputValue);
  };

  const handleClickDeleteSearch = useCallback(() => {
    setInputValue('');
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit} className="flex items-center">
        <SearchInput
          onChange={value => setInputValue(value)}
          value={inputValue}
          handleClickDeleteSearch={handleClickDeleteSearch}
          className="rounded-none rounded-tl-3xl rounded-bl-3xl"
          placeholder="Search"
        />
        <Button
          type="submit"
          disabled={!inputValue}
          className="rounded-none rounded-tr-3xl rounded-br-3xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          data-testid="search-button"
        >
          <Search />
        </Button>
      </form>
    </div>
  );
}
