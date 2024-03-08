'use client';

import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(
  isFetchingNextPage: boolean,
  hasNextPage: boolean,
  fetchNextPage: () => void
) {
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return loadMoreRef;
}
