import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { formatNumber } from '~/lib/utils';
import { Thumbnail } from '~/types/videos';
import he from 'he';
import Link from 'next/link';

type Props = {
  channelThumbnail: string;
  videoTitle: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
  thumbnail: Thumbnail;
  id: string;
};

export default function VideoItem({
  channelThumbnail,
  videoTitle,
  channelTitle,
  viewCount,
  publishedAt,
  thumbnail,
  id,
}: Props) {
  if (!thumbnail.height || !thumbnail.width) return null;

  return (
    <div>
      <Link href={`/watch?v=${id}`}>
        <Image
          width={thumbnail.width}
          className="rounded-lg"
          height={thumbnail.height}
          src={thumbnail.url}
          alt="thumbails"
          quality={100}
        />
      </Link>
      <div className="mt-3">
        <div className="flex gap-2 items-start">
          <Image
            src={channelThumbnail}
            alt="channel"
            className="rounded-full"
            width={36}
            height={36}
            quality={100}
          />
          <div className="flex flex-col">
            <h1 className="font-bold mb-1 line-clamp-2">
              {he.decode(videoTitle)}
            </h1>
            <div className="text-gray-600 text-sm font-medium flex flex-col">
              <p>{channelTitle}</p>
              <p>
                {formatNumber(viewCount)} views •{' '}
                {moment(publishedAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
