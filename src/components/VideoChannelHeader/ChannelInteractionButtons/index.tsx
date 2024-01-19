'use client';

import { youtube_v3 } from 'googleapis';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { formatNumber } from '~/lib/utils';

type Props = {
  video: youtube_v3.Schema$Video;
  rateYoutubeVideo: (videoId: string, rating: 'like' | 'dislike' | 'none') => Promise<void>;
  videoRating: youtube_v3.Schema$VideoGetRatingResponse;
};

export default function ChannelInteractionButtons({ video, rateYoutubeVideo, videoRating }: Props) {
  const [userRating, setUserRating] = useState(videoRating.items?.[0]?.rating || 'none');

  useEffect(() => {
    setUserRating(videoRating.items?.[0]?.rating || 'none');
  }, [videoRating]);

  const handleLike = async () => {
    if (userRating === 'like') {
      setUserRating('none');
      await rateYoutubeVideo(video.id || '', 'none');
    } else {
      setUserRating('like');
      await rateYoutubeVideo(video.id || '', 'like');
    }
  };

  const handleDislike = async () => {
    if (userRating === 'dislike') {
      setUserRating('none');
      await rateYoutubeVideo(video.id || '', 'none');
    } else {
      setUserRating('dislike');
      await rateYoutubeVideo(video.id || '', 'dislike');
    }
  };

  const getIconProps = (rating: string, currentRating: string) => {
    if (rating === currentRating) return { fill: 'black', stroke: 'none' };
    return undefined;
  };

  return (
    <div className="flex">
      <button
        aria-label="Like"
        onClick={handleLike}
        type="button"
        className="shadow-sm flex px-3 pr-0 py-2 bg-gray-100 hover:bg-gray-200 items-center gap-2 font-bold text-sm rounded-tl-full rounded-bl-full"
      >
        <ThumbsUp size={20} {...getIconProps('like', userRating)} />
        {formatNumber(video?.statistics?.likeCount || '')}
        <div className="h-full flex items-center">
          <div className="w-px bg-gray-300 h-[100%]" />
        </div>
      </button>
      <button
        onClick={handleDislike}
        aria-label="Dislike"
        type="button"
        className="px-3 py-2 shadow-sm bg-gray-100 rounded-tr-full rounded-br-full hover:bg-gray-200"
      >
        <ThumbsDown size={20} {...getIconProps('dislike', userRating)} />
      </button>
    </div>
  );
}
