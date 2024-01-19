import { youtube_v3 } from 'googleapis';
import React from 'react';
import { formatNumber } from '~/lib/utils';
import Image from 'next/image';

type Props = {
  video: youtube_v3.Schema$Video;
  channel?: youtube_v3.Schema$Channel;
};

export default function ChannelSubscribeButton({ video, channel }: Props) {
  return (
    <div>
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
  );
}
