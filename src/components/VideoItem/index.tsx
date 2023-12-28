import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { formatNumber } from '~/lib/utils';
import { Thumbnail } from '~/types/videos';

type Props = {
  channelThumbnail: string;
  videoTitle: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
  thumbnail: Thumbnail;
};

export default function VideoItem({
  channelThumbnail,
  videoTitle,
  channelTitle,
  viewCount,
  publishedAt,
  thumbnail,
}: Props) {
  return (
    <div>
      <div className="rounded-lg overflow-hidden flex items-center">
        <Image
          width={thumbnail.width}
          height={thumbnail.height}
          src={thumbnail.url}
          alt="thumbails"
        />
      </div>
      <div className="mt-3">
        <div className="flex gap-2 items-start">
          <Image
            src={channelThumbnail}
            alt="channel"
            className="rounded-full shrink-0"
            width={36}
            height={36}
          />
          <div className="flex flex-col">
            <h1 className="font-bold mb-1">{videoTitle}</h1>
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
