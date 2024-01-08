'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/DropdownMenu';
import Button from '~/components/shared/Button';
import SearchInput from '~/components/shared/SearchInput';
import { Input } from '~/components/shared/input/InputText';
import { COUNTRY_LIST } from '~/constants/country';
import { Filters } from '~/types/filters';

type Props = {
  updateFilter: (value: Filters) => void;
};

export default function CountryFilter({ updateFilter }: Props) {
  const [inputValue, setInputValue] = useState('');

  const filteredCountries = useMemo(
    () =>
      COUNTRY_LIST.filter(country =>
        country.label.toLowerCase().includes(inputValue.toLowerCase())
      ),
    [inputValue]
  );

  const handleClickDeleteSearch = useCallback(() => {
    setInputValue('');
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Countries</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className="px-2 py-1">
          <SearchInput
            onChange={value => setInputValue(value)}
            value={inputValue}
            handleClickDeleteSearch={handleClickDeleteSearch}
            className="rounded-3xl"
            placeholder="Search country..."
            size={16}
          />
        </div>
        {filteredCountries.slice(0, 10).map(country => {
          return (
            <DropdownMenuItem
              key={country.id}
              onClick={() => updateFilter(country)}
            >
              {country.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
