'use client';

import ReactPlayer from 'react-player';
import { YoutubeVideo } from '~/types/videos';
import Image from 'next/image';
import { formatNumber } from '~/lib/utils';

type Props = {
  video: YoutubeVideo;
};

export default function YoutubePlayer({ video }: Props) {
  return (
    <div>
      <div className="h-full aspect-video">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video.id}`}
          controls
          width={'100%'}
          height={'100%'}
          config={{
            youtube: {
              playerVars: {
                // autoplay: 1,
              },
            },
          }}
        />
      </div>
      <div className="mt-3 mb-6">
        <div className="flex items-center gap-2">
          <Image
            src={video.channel.snippet.thumbnails.high.url}
            alt="channel"
            className="rounded-full"
            width={36}
            height={36}
            quality={100}
          />
          <div className="flex flex-col">
            <span className="text-xl text-black font-bold">
              {video.snippet?.title}
            </span>
            <span className="text-xs text-gray-700 font-medium">
              {formatNumber(video.channel.statistics.subscriberCount)}{' '}
              subscribers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
