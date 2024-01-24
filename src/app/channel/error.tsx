'use client';

import React, { useEffect } from 'react';
import { SearchX } from 'lucide-react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[500px] mb-32 flex flex-col items-center justify-center p-4">
      <SearchX strokeWidth={1.5} className="h-24 w-24 text-gray-500 mb-8" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Channel not found</h1>
      <p className="text-lg text-gray-700 max-w-md text-center">
        The YouTube channel you&apos;re looking for could not be found. Please check the channel ID and try again.
      </p>
    </div>
  );
}
