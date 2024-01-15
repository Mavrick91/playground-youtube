import React from 'react';

export const Skeleton = {
  YoutubeVideo: () => (
    <div className="flex flex-col">
      <div className="animate-pulse h-44 rounded-md bg-gray-300" />
      <div className="mt-3">
        <div className="flex gap-2 items-start">
          <div className="animate-pulse h-9 w-9 shrink-0 rounded-full bg-gray-300" />
          <div className="flex flex-col w-full gap-2">
            <div className="animate-pulse h-4 rounded-md bg-gray-300" />
            <div className="animate-pulse h-4 rounded-md bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  ),
};
