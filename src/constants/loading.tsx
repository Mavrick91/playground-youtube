import React from 'react';
import { Skeleton } from '~/components/shared/Skeleton';

export const searchLoading = (
  <div className="grid grid-cols-4 gap-y-10 gap-x-4">
    {Array.from({ length: 7 }, (_, i) => i).map(num => (
      <Skeleton.YoutubeVideo key={num} />
    ))}
  </div>
);
