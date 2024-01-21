'use client';

import React from 'react';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { Separator } from '~/components/Separator';
import { Carousel, CarouselContent } from '~/components/shared/Carousel';

export default function LoadingFeature() {
  return (
    <MaxWidthWrapper>
      {Array.from({ length: 7 }, (_, i) => i).map(num => (
        <>
          <div className="flex flex-col" key={num}>
            <div className="my-6">
              <div className="animate-pulse h-6 w-[200px] rounded-md bg-gray-300" />
            </div>
            <div className="flex space-x-4 overflow-x-auto">
              <Carousel className="w-full">
                <CarouselContent className="space-x-4">
                  {Array.from({ length: 10 }).map(() => (
                    <div className="flex flex-col space-y-2">
                      <div className="animate-pulse w-[260px] h-[146px] rounded-md bg-gray-300" />

                      <div className="space-y-1">
                        <div className="animate-pulse h-6 w-[200px] rounded-md bg-gray-300" />
                        <div className="animate-pulse h-4 w-[100px] rounded-md bg-gray-300" />
                      </div>
                    </div>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <Separator className="bg-gray-300 mt-6" />
        </>
      ))}
    </MaxWidthWrapper>
  );
}
