'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchData } from '~/lib/fetcher';

interface GoogleMeResponse {
  names: Array<{ displayName: string }>;
  photos: Array<{ url: string }>;
}

export const useIsMe = (shouldFetch: boolean = false) =>
  useQuery({
    queryKey: ['google-me'],
    queryFn: async () => fetchData<GoogleMeResponse>('/api/google/me'),
    enabled: shouldFetch,
  });
