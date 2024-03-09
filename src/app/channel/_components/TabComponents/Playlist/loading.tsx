import React from 'react';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';

export default function PlaylistLoading() {
  return (
    <MaxWidthWrapper className="mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-1 gap-y-4 lg:gap-y-11 mt-11">
        {Array.from({ length: 12 }, (_, index) => index).map((num: number) => (
          <div key={num} className="col-span-1 lg:col-span-2">
            <div className="animate-pulse h-[114px] rounded-md bg-gray-300" />
            <div className="space-y-1 mt-3">
              <div className="animate-pulse h-4 w-[100px] rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
