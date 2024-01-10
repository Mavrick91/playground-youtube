'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/DropdownMenu';
import Button from '~/components/shared/Button';
import { CATEGORY_LIST } from '~/constants/category';
import { Filters } from '~/types/filters';

type Props = {
  updateFilter: (value: Filters) => void;
};

export default function CategoryFilter({ updateFilter }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {CATEGORY_LIST.map(category => {
          if (!category.subCategories) {
            return (
              <DropdownMenuItem
                key={category.id}
                onClick={() => updateFilter(category)}
              >
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
                    <DropdownMenuItem
                      key={subCategory.id}
                      onClick={() => updateFilter(subCategory)}
                    >
                      {index === 0 ? 'All' : subCategory.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
