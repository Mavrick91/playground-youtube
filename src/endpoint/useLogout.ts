import { useMutation } from '@tanstack/react-query';
import { fetchData } from '~/lib/fetcher';

export const useLogout = () =>
  useMutation({
    mutationFn: async () => fetchData<void>('/api/auth/logout', {}, { method: 'POST' }),
  });
