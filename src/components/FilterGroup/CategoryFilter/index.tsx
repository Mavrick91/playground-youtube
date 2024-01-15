'use client';

import React, { useCallback, useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/DropdownMenu';
import Button from '~/components/shared/Button';
import { CATEGORY_LIST } from '~/constants/category';
import { activeFilterButton } from '~/constants/style';
import useQueryParams from '~/hooks/useUpdateQueryParams';

export default function CategoryFilter() {
  const { updateQueryParams, getQueryParam } = useQueryParams({
    deleteQ: true,
  });

  const handleUpdateCategory = useCallback(
    (value: string | null) => {
      updateQueryParams('topicId', value);
    },
    [updateQueryParams]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" {...activeFilterButton(!!getQueryParam('topicId'))}>
          Categories
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {CATEGORY_LIST.map(category => {
          if (!category.subCategories) {
            return (
              <DropdownMenuItem key={category.id} onClick={() => handleUpdateCategory(category.id)}>
                {category.label}
              </DropdownMenuItem>
            );
          }

          return (
            <DropdownMenuSub key={category.id}>
              <DropdownMenuSubTrigger>{category.label}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {category.subCategories.map((subCategory, index) => (
                    <DropdownMenuItem key={subCategory.id} onClick={() => handleUpdateCategory(subCategory.id)}>
                      {index === 0 ? 'All' : subCategory.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleUpdateCategory(null)} asChild>
          <Button className="w-full" size="sm" variant="link">
            Reset
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
