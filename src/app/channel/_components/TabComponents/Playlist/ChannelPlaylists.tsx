'use client';

import React from 'react';
import PlaylistCard from '~/components/PlaylistCard';
import ContentNoItems from '~/components/ContentNoItems';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPlaylist } from '~/services/playlistService';
import useInfiniteScroll from '~/hooks/useInfiniteScroll';

type Props = {
  channelId: string;
};

function PlaylistGrid({ channelId }: Props) {
  const {
    data: playlists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['playlist', channelId],
    queryFn: async ({ pageParam = '' }) => getPlaylist({ channelId, pageToken: pageParam }),
    getNextPageParam: lastPage => lastPage.nextPageToken ?? undefined,
    initialPageParam: '',
  });

  const hasItems = playlists?.pages
    .flatMap(page => page.items)
    .some(playlist => (playlist?.contentDetails?.itemCount || 0) > 0);

  const loadMoreRef = useInfiniteScroll(isFetchingNextPage, hasNextPage, fetchNextPage);

  if (!hasItems) {
    return <ContentNoItems />;
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-1 gap-y-4 lg:gap-y-11 mt-11">
        {playlists?.pages
          .flatMap(page => page.items)
          .map((playlist, index, array) => {
            const playlistItemsCount = playlist?.contentDetails?.itemCount || 0;

            if (!playlistItemsCount || !playlist) return null;

            return (
              <div
                ref={index === array.length - 1 ? loadMoreRef : null}
                key={playlist?.id}
                className="col-span-1 lg:col-span-2"
              >
                <PlaylistCard playlist={playlist} />
              </div>
            );
          })}
        {isFetchingNextPage &&
          Array.from({ length: 4 }, (_, index) => index).map((num: number) => (
            <div key={num} className="col-span-1 lg:col-span-2">
              <div className="animate-pulse h-[120px] rounded-md bg-gray-300" />
              <div className="space-y-1 mt-3">
                <div className="animate-pulse h-4 w-[100px] rounded-md bg-gray-300" />
              </div>
            </div>
          ))}
      </div>
      {!hasNextPage && <div className="text-center mt-4">{`🎉 You've reached the end! 🎉`}</div>}
    </div>
  );
}

export default PlaylistGrid;
