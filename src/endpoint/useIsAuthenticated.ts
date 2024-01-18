'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchData } from '~/lib/fetcher';

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

export const useIsAuthenticated = () =>
  useQuery({
    queryKey: ['auth-status'],
    queryFn: async () => fetchData<AuthStatusResponse>('/api/auth/status'),
  });
