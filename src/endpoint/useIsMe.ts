'use client';

import { useQuery } from '@tanstack/react-query';
import { youtube_v3 } from 'googleapis';
import { fetchData } from '~/lib/fetcher';

export const useIsMe = (shouldFetch: boolean = false) =>
  useQuery({
    queryKey: ['google-me'],
    queryFn: async () => fetchData<youtube_v3.Schema$ChannelListResponse>('/api/google/me'),
    enabled: shouldFetch,
  });
