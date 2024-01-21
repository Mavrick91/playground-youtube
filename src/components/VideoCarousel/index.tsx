'use client';

import { youtube_v3 } from 'googleapis';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../shared/Carousel';
import VideoItem from '../VideoItem';

type Props = {
  videos: youtube_v3.Schema$SearchListResponse;
  title: string;
};
export default function VideoCarousel({ videos, title }: Props) {
  return (
    <div>
      <div className="my-6">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {videos.items?.map(video => (
            <CarouselItem className="basis-1/5">
              <VideoItem
                channelThumbnail={video.snippet?.thumbnails?.default?.url}
                videoTitle={video.snippet?.title}
                channelTitle={video.snippet?.channelTitle}
                viewCount="0"
                duration="0"
                publishedAt={video.snippet?.publishedAt}
                thumbnail={video.snippet?.thumbnails?.medium}
                id={video.id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
