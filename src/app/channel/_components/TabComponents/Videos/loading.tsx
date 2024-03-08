import React from 'react';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';

export default function LoadingVideos() {
  return (
    <MaxWidthWrapper className="mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-4 lg:gap-y-11 gap-x-4 mt-11">
        {Array.from({ length: 12 }, (_, index) => index).map((num: number) => (
          <div key={num} className="col-span-1 lg:col-span-3">
            <div className="animate-pulse h-[146px] rounded-md bg-gray-300" />
            <div className="space-y-1 mt-3">
              <div className="animate-pulse h-6 w-[200px] rounded-md bg-gray-300" />
              <div className="animate-pulse h-4 w-[100px] rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
