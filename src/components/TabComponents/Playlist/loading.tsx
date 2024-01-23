import React from 'react';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';

export default function LoadingPlaylist() {
  return (
    <MaxWidthWrapper className="mb-32">
      <div className="grid grid-cols-12 gap-x-1 gap-y-11 mt-11">
        {Array.from({ length: 12 }, (_, index) => index).map((num: number) => (
          <div className="flex flex-col space-y-2 col-span-2" key={num}>
            <div className="animate-pulse h-[146px] rounded-md bg-gray-300" />
            <div className="space-y-1">
              <div className="animate-pulse h-6 w-[200px] rounded-md bg-gray-300" />
              <div className="animate-pulse h-4 w-[100px] rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
