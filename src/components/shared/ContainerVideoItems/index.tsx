import React from 'react';
import VideoItem from '~/components/VideoItem';
import { isYoutubeVideo, isYouTubeSearchVideo } from '~/lib/types-helper';
import { YouTubeSearchListResponse } from '~/types/search';
import { YoutubeVideoResponse } from '~/types/videos';

type Props = {
  data: YouTubeSearchListResponse | YoutubeVideoResponse;
};

export default function ContainerVideoItems({ data }: Props) {
  return (
    <div className="grid grid-cols-4 gap-y-10 gap-x-4">
      {data.items.map(video => {
        let channelThumbnail = '';
        let videoId = '';

        if (isYoutubeVideo(video)) {
          channelThumbnail = video.channel.snippet.thumbnails.high.url;
          videoId = video.id;
        } else {
          if (video.kind === 'youtube#channel') return null;
          channelThumbnail = video.channelThumbnail;
        }

        return (
          <VideoItem
            key={video.snippet.title}
            channelThumbnail={channelThumbnail}
            channelTitle={video.snippet.channelTitle}
            publishedAt={video.snippet.publishedAt}
            thumbnail={video.snippet.thumbnails.medium}
            videoTitle={video.snippet.title}
            viewCount={video.statistics?.viewCount || '0'}
            id={videoId}
          />
        );
      })}
    </div>
  );
}
