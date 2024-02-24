'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchData } from '~/lib/fetcher';
import { User } from '@prisma/client';

export const useIsMe = (shouldFetch: boolean = false) =>
  useQuery({
    queryKey: ['google-me'],
    queryFn: async () => fetchData<User>('/api/google/me'),
    enabled: shouldFetch,
  });
