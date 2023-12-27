'use client';

import useSWR from 'swr';

interface GoogleMeResponse {
  names: Array<{ displayName: string }>;
  photos: Array<{ url: string }>;
}

export const useIsMe = (shouldFetch?: boolean) => useSWR<GoogleMeResponse>(
    shouldFetch ? '/api/google/me' : null
);
