import { youtube_v3 } from 'googleapis';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import React from 'react';
import { formatNumber } from '~/lib/utils';

type Props = {
  video: youtube_v3.Schema$Video;
};

export default function ChannelInteractionButtons({ video }: Props) {
  return (
    <div className="flex">
      <button
        aria-label="Like"
        type="button"
        className="shadow-sm flex px-3 pr-0 py-2 bg-gray-100 hover:bg-gray-200 items-center gap-2 font-bold text-sm rounded-tl-full rounded-bl-full"
      >
        <ThumbsUp size={20} />
        {formatNumber(video?.statistics?.likeCount || '')}
        <div className=" bg-red-500 flex items-center">
          <div className="w-px bg-gray-300 h-[100%]" />
        </div>
      </button>
      <button
        aria-label="Dislike"
        type="button"
        className="px-3 py-2 shadow-sm bg-gray-100 rounded-tr-full rounded-br-full hover:bg-gray-200"
      >
        <ThumbsDown size={20} />
      </button>
    </div>
  );
}
