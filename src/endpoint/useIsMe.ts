'use client';

import axios from 'axios';
import { useQuery } from 'react-query';

interface GoogleMeResponse {
  names: Array<{ displayName: string }>;
  photos: Array<{ url: string }>;
}

export const useIsMe = (shouldFetch: boolean = false) => {
  console.log("🚀 ~ file: useIsMe.ts:12 ~ useIsMe ~ shouldFetch:", shouldFetch)
  return useQuery<GoogleMeResponse>(
    'google-me',
    async () => {
      const response = await axios.get('/api/google/me');

      return response.data;
    },
    {
      enabled: shouldFetch,
    }
  );
};
