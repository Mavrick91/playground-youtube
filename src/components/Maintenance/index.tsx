import { Wrench } from 'lucide-react';
import React from 'react';

export default function Maintenance() {
  return (
    <div className="h-[500px] mb-32 flex flex-col items-center justify-center p-4">
      <Wrench strokeWidth={1.5} className="h-24 w-24 text-gray-500 mb-8" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Under Maintenance</h1>
      <p className="text-lg text-gray-700 max-w-md text-center">
        We&apos;re currently performing some maintenance on our site. We'll be back up and running as soon as possible.
        We apologize for any inconvenience.
      </p>
    </div>
  );
}
