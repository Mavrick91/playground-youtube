import React from 'react';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';

function PlaylistLoading() {
  return (
    <MaxWidthWrapper>
      <div className="py-6">
        <div className="grid grid-cols-10 gap-8">
          <div className="col-span-3 shrink-0">
            <div
              className="animate-pulse rounded-md bg-gray-300"
              style={{
                height: 'calc(100vh - 150px)',
              }}
            />
          </div>
          <div className="col-span-7">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="animate-pulse h-10 w-24 rounded-md bg-gray-300" />
                <div className="animate-pulse h-10 w-24 rounded-md bg-gray-300" />
              </div>

              <div className="flex gap-3">
                <div className="animate-pulse w-40 h-[90px] shrink-0 rounded-lg bg-gray-300" />
                <div className="w-full flex flex-col gap-3">
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="animate-pulse w-40 h-[90px] shrink-0 rounded-lg bg-gray-300" />
                <div className="w-full flex flex-col gap-3">
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="animate-pulse w-40 h-[90px] shrink-0 rounded-lg bg-gray-300" />
                <div className="w-full flex flex-col gap-3">
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="animate-pulse w-40 h-[90px] shrink-0 rounded-lg bg-gray-300" />
                <div className="w-full flex flex-col gap-3">
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="animate-pulse w-40 h-[90px] shrink-0 rounded-lg bg-gray-300" />
                <div className="w-full flex flex-col gap-3">
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                  <div className="animate-pulse h-4 rounded-md bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default PlaylistLoading;
