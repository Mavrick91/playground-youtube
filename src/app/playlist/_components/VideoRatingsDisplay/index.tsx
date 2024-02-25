'use client';

import { youtube_v3 } from 'googleapis';
import React, { useState } from 'react';
import VideoFeature from '~/app/playlist/_components/VideoFeature';
import VideoList from '~/app/playlist/_components/VideoList';

type Props = {
  likedVideos?: youtube_v3.Schema$VideoListResponse;
  dislikedVideos?: youtube_v3.Schema$VideoListResponse;
  defaultChoice?: 'liked' | 'disliked';
};

function VideoRatingsDisplay({ likedVideos, dislikedVideos, defaultChoice = 'liked' }: Props) {
  const [selectedChoice, setSelectedChoice] = useState<'liked' | 'disliked'>(defaultChoice);

  const handleUpdateChoice = (choice: 'liked' | 'disliked') => {
    setSelectedChoice(choice);
  };

  return (
    <div className="grid grid-cols-10 gap-8">
      <VideoFeature selectedChoice={selectedChoice} video={selectedChoice === 'liked' ? likedVideos : dislikedVideos} />
      <VideoList
        videos={selectedChoice === 'liked' ? likedVideos?.items : dislikedVideos?.items}
        handleUpdateChoice={handleUpdateChoice}
        selectedChoice={selectedChoice}
      />
    </div>
  );
}

export default VideoRatingsDisplay;
