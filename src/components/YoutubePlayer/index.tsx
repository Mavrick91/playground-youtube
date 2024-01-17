'use client';

import React from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { formatNumber } from '~/lib/utils';
import { youtube_v3 } from 'googleapis';

type Props = {
  video?: youtube_v3.Schema$Video;
  channel?: youtube_v3.Schema$Channel;
};

export default function YoutubePlayer({ video, channel }: Props) {
  if (!video?.id) return null;

  return (
    <div>
      <div className="h-full aspect-video">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video?.id}`}
          controls
          width="100%"
          height="100%"
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
        <span className="text-xl text-black font-bold">{video?.snippet?.title}</span>
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <Image
              src={channel?.snippet?.thumbnails?.high?.url || ''}
              alt="channel"
              className="rounded-full"
              width={36}
              height={36}
              quality={100}
            />
            <div className="flex flex-col">
              <span className="text-black font-bold">{video?.snippet?.channelTitle}</span>
              <span className="text-xs text-gray-700 font-medium">
                {formatNumber(channel?.statistics?.subscriberCount || '')} subscribers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
