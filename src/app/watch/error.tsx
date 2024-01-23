'use client';

import { useEffect } from 'react';
import { VideoOff } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '~/components/shared/Button';
import { cn } from '~/lib/utils';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  console.error(error.message);
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[500px] mb-32 flex flex-col items-center justify-center p-4">
      <VideoOff className="h-12 w-12 text-gray-500 dark:text-gray-400" />
      <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mt-4">Video Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">The video you are looking for could not be found.</p>
      <Link className={cn(buttonVariants(), 'mt-4')} href="/">
        Return to Homepage
      </Link>
    </div>
  );
}
