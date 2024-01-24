'use client';

import ClientImage from '~/components/ClientImage';
import { useSearchParams } from 'next/navigation';
import { cn } from '~/lib/utils';
import { Play } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

type Props = {
  thumbnail: string;
  title: string;
  channelTitle: string;
  index: number;
  videoId: string;
  playlistId: string;
};

export default function PlaylistVideoListItem({ thumbnail, title, channelTitle, index, videoId, playlistId }: Props) {
  const params = useSearchParams();
  const videoParamsId = params.get('v');

  return (
    <Link
      href={{
        pathname: '/watch',
        query: {
          v: videoId,
          list: playlistId,
        },
      }}
      className={cn('flex items-center py-2 pr-2 hover:bg-black/10', {
        'bg-black/20': videoParamsId === videoId,
      })}
    >
      <div className="shrink-0 w-6 flex items-center justify-center">
        {videoParamsId === videoId ? (
          <Play data-testid="lucide-play" width={10} fill="black" stroke="none" />
        ) : (
          <div className="text-xs text-gray-600">{index}</div>
        )}
      </div>
      <div className="flex-shrink-0 w-28 h-16 relative mr-2">
        <ClientImage alt="Video thumbnail" src={thumbnail} fill className=" rounded-lg" />
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-bold line-clamp-2">{title}</p>
        <p
          className={cn('text-xs text-gray-500', {
            'text-gray-800': videoParamsId === videoId,
          })}
        >
          {channelTitle}
        </p>
      </div>
    </Link>
  );
}
