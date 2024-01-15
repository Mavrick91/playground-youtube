'use client';

import { formatDistanceToNow, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { formatNumber } from '~/lib/utils';
import LinkifyIt from 'linkify-it';

type Props = {
  viewCount: string;
  publishedAt: string;
  description: string;
};

export default function DescriptionVideo({ viewCount, publishedAt, description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const date = parseISO(publishedAt);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  const linkify = LinkifyIt();

  const descriptionElements = description.split('\n').map((line, lineIndex) => {
    const words = line.split(' ').map((word, wordIndex) => {
      const links = linkify.match(word);
      if (links) {
        return (
          <a
            href={links[0].url}
            key={`${lineIndex}-${wordIndex}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            {word}
          </a>
        );
      } else {
        return ` ${word} `;
      }
    });

    if (line === '') return <br key={lineIndex} />;

    return <p key={lineIndex}>{words}</p>;
  });

  return (
    <button
      className="relative w-full text-left rounded-md bg-gray-200 hover:bg-gray-300 transition-all"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-3 flex flex-col">
        <div className="text-gray-900 font-semibold text-sm">
          {formatNumber(viewCount)} views
          <span className="mx-2">•</span>
          {timeAgo}
        </div>
        <div className={`text-sm overflow-hidden ${isExpanded ? '' : 'max-h-[3.6rem]'}`}>{descriptionElements}</div>
      </div>
    </button>
  );
}
