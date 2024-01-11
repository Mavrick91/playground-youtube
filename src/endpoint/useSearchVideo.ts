'use client';

import axios from 'axios';
import { useQuery } from 'react-query';
import { YouTubeSearchListResponse } from '~/types/search';

type SearchVideoParams = Partial<{
  q: string;
  topicId: string;
  regionCode: string;
  location: string;
  radius: string;
}>;

export const useSearchVideo = (params: SearchVideoParams) => {
  return useQuery<YouTubeSearchListResponse>(
    ['google-search'],
    async () =>
      axios
        .get('/api/google/search', {
          params,
        })
        .then(res => res.data),
    {
      enabled: false,
    }
  );
};
