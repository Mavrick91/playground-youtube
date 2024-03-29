import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { formatNumber } from '~/lib/utils';
import he from 'he';
import Link from 'next/link';
import { youtube_v3 } from 'googleapis';

type Props = {
  channelThumbnail?: string | null;
  videoTitle?: string | null;
  channelTitle?: string | null;
  channelId?: string | null;
  viewCount?: string | null;
  duration?: string | null;
  publishedAt?: string | null;
  thumbnail?: youtube_v3.Schema$Thumbnail;
  id?: string | youtube_v3.Schema$ResourceId | null | undefined;
};

export default function VideoItem({
  channelThumbnail,
  videoTitle,
  channelTitle,
  channelId,
  viewCount,
  publishedAt,
  thumbnail,
  duration,
  id,
}: Props) {
  if (!thumbnail?.height || !thumbnail?.width || !thumbnail?.url) return null;
  const videoId = typeof id === 'string' ? id : id?.videoId;

  return (
    <div>
      <Link href={`/watch?v=${videoId}`} className="relative w-full aspect-video block">
        <Image
          sizes="(min-width: 1204px) 298px 127px, (min-width: 768px) 298px 165px, 355px 200px"
          fill
          className="rounded-lg"
          src={thumbnail.url}
          alt="thumbails"
          quality={100}
        />
        <div className="absolute bottom-2 right-5 text-white bg-black/60 text-xs py-px px-1 rounded-md font-bold">
          {duration}
        </div>
      </Link>
      <div className="mt-3">
        <div className="flex gap-2 items-start">
          {channelThumbnail && (
            <Link href={`/channel/${channelId}/videos`}>
              <Image
                src={channelThumbnail}
                alt="channel"
                className="rounded-full"
                width={36}
                height={36}
                quality={100}
              />
            </Link>
          )}
          <div className="flex flex-col">
            <h1 className="font-medium text-sm mb-1 line-clamp-2">{he.decode(videoTitle || '')}</h1>
            <div className="text-gray-600 text-sm font-medium flex flex-col">
              {channelTitle && (
                <Link href={`/channel/${channelId}/videos`}>
                  <p className="hover:underline underline-offset-1">{channelTitle}</p>
                </Link>
              )}
              <p>
                {formatNumber(viewCount || '')} views • {moment(publishedAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
