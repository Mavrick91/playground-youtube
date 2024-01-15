'use client';

import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '~/constants/apiUrl';

interface GoogleMeResponse {
  names: Array<{ displayName: string }>;
  photos: Array<{ url: string }>;
}

export const useIsMe = (shouldFetch: boolean = false) => {
  return useQuery<GoogleMeResponse>(
    'google-me',
    async () => {
      const response = await axios.get(API.GOOGLE.ME);

      return response.data;
    },
    {
      enabled: shouldFetch,
    }
  );
};
