'use client';

import useSWR from 'swr';

interface GoogleMeResponse {
  names: Array<{ displayName: string }>;
  photos: Array<{ url: string }>;
}

export const useIsMe = (shouldFetch: boolean | undefined) => {
  const { data, error } = useSWR<GoogleMeResponse>(
    shouldFetch ? '/api/google/me' : null
  );
  const isLoading = !data && !error;
  const isMe = data;
  return { isLoading, isMe };
};
