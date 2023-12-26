'use client';

import useSWR from 'swr';

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

export const useIsAuthenticated = () => {
  const { data, error } = useSWR<AuthStatusResponse>('/api/auth/status');
  const isLoading = !data && !error;
  const isAuthenticated = data?.isAuthenticated;
  return { isLoading, isAuthenticated };
};
