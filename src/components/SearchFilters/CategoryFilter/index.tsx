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
import { Category } from '~/types/category';

type Props = {
  updateCategory: (category: Category) => void;
};

export default function CategoryFilter({ updateCategory }: Props) {
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
                onClick={() => updateCategory(category)}
              >
                {category.label}
              </DropdownMenuItem>
            );
          }

          return (
            <DropdownMenuSub key={category.id}>
              <DropdownMenuSubTrigger
                className="cursor-pointer"
                onClick={() => updateCategory(category)}
              >
                {category.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {category.subCategories.map(subCategory => (
                    <DropdownMenuItem
                      key={subCategory.id}
                      onClick={() => updateCategory(subCategory)}
                    >
                      {subCategory.label}
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
