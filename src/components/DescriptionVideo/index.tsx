'use client';

import { formatDistanceToNow, parseISO } from 'date-fns';
import { useState } from 'react';
import { descriptionElements } from '~/lib/string';
import { formatNumber } from '~/lib/utils';

type Props = {
  viewCount: string;
  publishedAt: string;
  description: string;
};

export default function DescriptionVideo({ viewCount, publishedAt, description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const date = parseISO(publishedAt);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <button
      type="button"
      className="relative w-full text-left rounded-md bg-gray-200 hover:bg-gray-300 transition-all"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-3 flex flex-col">
        <div className="text-gray-900 font-semibold text-sm">
          {formatNumber(viewCount)} views
          <span className="mx-2">•</span>
          {timeAgo}
        </div>
        <div className={`text-sm overflow-hidden ${isExpanded ? '' : 'max-h-[3.6rem]'}`}>
          {descriptionElements(description)}
        </div>
      </div>
    </button>
  );
}
