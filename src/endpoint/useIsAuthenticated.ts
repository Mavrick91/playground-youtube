'use client';

import axios from 'axios';
import { useQuery } from 'react-query';

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

export const useIsAuthenticated = () =>
  useQuery<AuthStatusResponse>('auth-status', async () => {
    const response = await axios.get('/api/auth/status');

    return response.data;
  });
