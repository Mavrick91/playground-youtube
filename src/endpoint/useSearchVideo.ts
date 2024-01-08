'use client';

import axios from 'axios';
import { useQuery } from 'react-query';
import { YouTubeSearchListResponse } from '~/types/search';

type SearchVideoParams = Partial<{
  q: string;
  topicId: string;
}>;

export const useSearchVideo = ({ q, topicId }: SearchVideoParams) => {
  return useQuery<YouTubeSearchListResponse>(
    ['google-search'],
    async () =>
      axios
        .get('/api/google/search', {
          params: { q, topicId },
        })
        .then(res => res.data),
    {
      enabled: false,
    }
  );
};
