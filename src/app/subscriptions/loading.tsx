import React from 'react';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';

function SubscriptionLoading() {
  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-3 gap-6 p-4">
        {Array.from({ length: 7 }, (_, i) => i).map(num => (
          <div key={{ num }} className="flex gap-3 items-center bg-white p-4 rounded-lg shadow-md space-y-2">
            <div className="animate-pulse h-[100px] w-[100px] rounded-full bg-gray-300" />

            <div className="grow">
              <div className="flex flex-col shrink grow gap-1">
                <div className="animate-pulse h-6 w-2/3 rounded-md bg-gray-300" />
                <div className="animate-pulse h-4 w-full rounded-md bg-gray-300" />
                <div className="animate-pulse h-4 w-full rounded-md bg-gray-300" />
              </div>

              <div className="animate-pulse h-8 w-32 mt-5 rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

export default SubscriptionLoading;
