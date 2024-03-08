'use client';

import React, { useEffect, useRef } from 'react';
import VideoItem from '~/components/VideoItem';
import { parseISO8601Duration } from '~/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getActivitiesDetails } from '~/services/activityService';

type Props = {
  channelId: string;
};

function ChannelVideos({ channelId }: Props) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: channelActivities,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['channelActivities', channelId],
    queryFn: async ({ pageParam = '' }) => getActivitiesDetails({ channelId, maxResults: 50, pageToken: pageParam }),
    getNextPageParam: lastPage => lastPage.nextPageToken ?? undefined,
    initialPageParam: '',
  });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.001 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-4 lg:gap-y-11 gap-x-4 mt-11">
      {channelActivities?.pages
        .flatMap(page => page.videoDetails)
        .filter((video, index, self) => index === self.findIndex(v => v.id === video.id))
        .map((video, index, array) => {
          return (
            <div
              key={video.id}
              className="col-span-1 lg:col-span-3"
              ref={index === array.length - 1 ? loadMoreRef : null}
            >
              <VideoItem
                videoTitle={video.snippet?.title}
                duration={parseISO8601Duration(video.contentDetails?.duration || '')}
                publishedAt={video.snippet?.publishedAt}
                thumbnail={video.snippet?.thumbnails?.medium}
                channelThumbnail={null}
                viewCount={video.statistics?.viewCount}
                id={video.id}
              />
            </div>
          );
        })}
      {isFetchingNextPage &&
        Array.from({ length: 12 }, (_, index) => index).map((num: number) => (
          <div key={num} className="col-span-1 lg:col-span-3">
            <div className="animate-pulse w-full aspect-video rounded-md bg-gray-300" />
            <div className="space-y-1 mt-3">
              <div className="animate-pulse h-6 w-[200px] rounded-md bg-gray-300" />
              <div className="animate-pulse h-4 w-[100px] rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChannelVideos;
