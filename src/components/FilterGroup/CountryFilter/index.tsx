'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/DropdownMenu';
import Button from '~/components/shared/Button';
import SearchInput from '~/components/shared/SearchInput';
import Tooltip from '~/components/shared/Tooltip';
import { COUNTRY_LIST } from '~/constants/country';
import { activeFilterButton } from '~/constants/style';
import useQueryParams from '~/hooks/useUpdateQueryParams';

export default function CountryFilter() {
  const { updateQueryParams, getQueryParam } = useQueryParams({
    deleteQ: true,
  });

  const [inputValue, setInputValue] = useState('');

  const filteredCountries = useMemo(() => {
    if (!inputValue) return [];
    return COUNTRY_LIST.filter(country =>
      country.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue]);

  const resetInputValue = useCallback(() => {
    setInputValue('');
  }, []);

  const regionLabel = useMemo(() => {
    const country = COUNTRY_LIST.find(
      country => country.id === getQueryParam('regionCode')
    )?.label;
    if (country) {
      return country;
    }

    return 'Search country...';
  }, [getQueryParam]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          {...activeFilterButton(!!getQueryParam('regionCode'))}
        >
          Videos available in a specific country
          <Tooltip tip="This setting filters the videos based on their availability in a specific country" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        onInteractOutside={resetInputValue}
        className="w-[277px]"
      >
        <div className="px-2 py-1 flex gap-2">
          <SearchInput
            autoFocus
            onChange={value => setInputValue(value)}
            value={inputValue}
            handleClickDeleteSearch={resetInputValue}
            className="rounded-3xl"
            placeholder={regionLabel}
            size={16}
          />
          <DropdownMenuItem
            onClick={() => updateQueryParams('regionCode', null)}
            asChild
          >
            <Button size="sm" variant="link">
              Reset
            </Button>
          </DropdownMenuItem>
        </div>
        {filteredCountries.slice(0, 10).map(country => {
          return (
            <DropdownMenuItem
              textValue="test"
              key={country.id}
              onClick={() => {
                updateQueryParams('regionCode', country.id);
                resetInputValue();
              }}
            >
              {country.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
