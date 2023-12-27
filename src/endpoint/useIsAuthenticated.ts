'use client';

import useSWR from 'swr';

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

export const useIsAuthenticated = () => useSWR<AuthStatusResponse>('/api/auth/status');
