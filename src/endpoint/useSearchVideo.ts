'use client';

import axios from 'axios';
import { useQuery } from 'react-query';
import { YouTubeSearchListResponse } from '~/types/search';

export const useSearchVideo = (query: string) => {
  return useQuery<YouTubeSearchListResponse>(
    'google-search',
    async () => {
      const response = await axios.get(
        '/api/google/search' + '?q=' + encodeURIComponent(query)
      );

      return response.data;
    },
    {
      enabled: false,
    }
  );
};
