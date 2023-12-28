'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const QueryProvider = ({
  children,
}: QueryProviderProps): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
