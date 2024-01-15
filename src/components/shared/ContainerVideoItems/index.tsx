import React from 'react';
import VideoItem from '~/components/VideoItem';
import { ItemWithStatistics } from '~/types/searchVideos';

type Props = {
  data: ItemWithStatistics[];
};

export default function ContainerVideoItems({ data }: Props) {
  return (
    <div className="grid grid-cols-4 gap-y-10 gap-x-4">
      {data.map(video => {
        if (video.kind === 'youtube#channel') return null;

        return (
          <VideoItem
            key={video.snippet?.title}
            channelThumbnail={video.channelThumbnail}
            channelTitle={video.snippet?.channelTitle}
            publishedAt={video.snippet?.publishedAt}
            thumbnail={video.snippet?.thumbnails?.medium}
            videoTitle={video.snippet?.title || ''}
            viewCount={video.statistics?.viewCount}
            id={video.id}
          />
        );
      })}
    </div>
  );
}
