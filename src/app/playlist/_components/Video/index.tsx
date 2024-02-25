import { youtube_v3 } from 'googleapis';
import { formatNumber } from '~/lib/utils';
import moment from 'moment';
import React from 'react';
import Link from 'next/link';

type VideoProps = {
  video?: youtube_v3.Schema$Video;
  index: number;
};

function Video({ video, index }: VideoProps) {
  return (
    <Link href={`/watch?v=${video?.id}`} className="flex text-left space-x-4 hover:bg-slate-900/20 py-1 rounded-lg">
      <div className="flex items-center">
        <span className="text-gray-500 px-2 min-w-[30px] text-sm font-medium">{index}</span>
        <img
          alt="Video thumbnail"
          className="object-cover shrink-0 w-40 h-[90px] rounded-lg"
          height="90"
          src={video?.snippet?.thumbnails?.high?.url || ''}
          width="160"
        />
      </div>
      <div>
        <p className="text-slate-900 font-bold">{video?.snippet?.title}</p>
        <p className="text-xs text-slate-700">
          {video?.snippet?.channelTitle} • {formatNumber(video?.statistics?.viewCount || '')} views •{' '}
          {moment(video?.snippet?.publishedAt).fromNow()}
        </p>
      </div>
    </Link>
  );
}

export default Video;
