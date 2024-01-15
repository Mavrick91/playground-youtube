'use client';

import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '~/constants/apiUrl';

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

export const useIsAuthenticated = () =>
  useQuery<AuthStatusResponse>('auth-status', async () => {
    const response = await axios.get(API.AUTH.STATUS);

    return response.data;
  });
