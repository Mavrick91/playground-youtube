'use client';

import axios from 'axios';
import { useQuery } from 'react-query';

interface GoogleMeResponse {
  names: Array<{ displayName: string }>;
  photos: Array<{ url: string }>;
}

export const useIsMe = (shouldFetch: boolean = false) => {
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
