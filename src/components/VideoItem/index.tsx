import React from 'react';
import Image from 'next/image';
import { formatNumber } from '~/lib/utils';
import moment from 'moment';
import { YoutubeVideo } from '~/types/videos';

type Props = {
  video: YoutubeVideo;
};

export default function VideoItem({ video }: Props) {
  return (
    <div>
      <div className="rounded-lg overflow-hidden flex items-center">
        <Image
          width={video.snippet.thumbnails.high.width}
          height={video.snippet.thumbnails.high.height}
          src={video.snippet.thumbnails.high.url}
          alt="thumbails"
        />
      </div>
      <div className="mt-3">
        <div className="flex gap-2 items-start">
          <Image
            src={video.channel.snippet.thumbnails.default.url}
            alt="channel"
            className="rounded-full shrink-0"
            width={36}
            height={36}
          />
          <div className="flex flex-col">
            <h1 className="font-bold mb-1">{video.snippet.title}</h1>
            <div className="text-gray-600 text-sm font-medium flex flex-col">
              <p>{video.channel.snippet.title}</p>
              <p>
                {formatNumber(video.statistics.viewCount)} views •{' '}
                {moment(video.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
