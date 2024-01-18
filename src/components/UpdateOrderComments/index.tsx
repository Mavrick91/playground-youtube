'use client';

import { ListFilter } from 'lucide-react';
import { cn } from '~/lib/utils';
import { useOrderComments } from '~/providers/OrderCommentsProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../DropdownMenu';
import Button from '../shared/Button';

export default function UpdateOrderComments() {
  const { setOrder, order } = useOrderComments();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ListFilter />
          Sort by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => setOrder('time')}
          className={cn('p-4', {
            'bg-gray-100': order === 'time',
          })}
        >
          The most recent
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn('p-4', {
            'bg-gray-100': order === 'relevance',
          })}
          onClick={() => setOrder('relevance')}
        >
          Top comments
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
