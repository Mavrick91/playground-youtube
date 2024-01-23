'use client';

import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { Bomb } from 'lucide-react';
import React from 'react';

export default function ErrorChannel() {
  return (
    <MaxWidthWrapper>
      <div className="h-[500px] mb-32 flex flex-col items-center justify-center p-4">
        <Bomb strokeWidth={1.5} className="h-24 w-24 text-gray-500 mb-8" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-lg text-gray-700 max-w-md text-center">
          We&apos;re sorry, but the page you were looking for could not be found. We apologize for any inconvenience.
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
