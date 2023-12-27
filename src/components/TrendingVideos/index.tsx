import React from 'react';
import { cookies } from 'next/headers';
import { YoutubeVideo, YoutubeVideoResponse } from '~/types/videos';
import VideoItem from '../VideoItem';

async function getData(
  auth_token: string | undefined
): Promise<YoutubeVideoResponse> {
  const res = await fetch('http://localhost:3000/api/google/trending', {
    headers: {
      Cookie: `auth_token=${auth_token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function TrendingVideos() {
  const auth_token = cookies().get('auth_token')?.value;
  const data = await getData(auth_token);

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.items.map((video: YoutubeVideo) => {
        return <VideoItem key={video.id} video={video} />;
      })}
    </div>
  );
}
