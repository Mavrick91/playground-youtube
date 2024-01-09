import { RenderOptions, render } from '@testing-library/react';
import React, { ComponentType } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';

export function createDefaultQueryResponse(overrides = {}) {
  return {
    data: undefined,
    error: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isFetching: false,
    isIdle: true,
    status: 'idle',
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    isFetched: false,
    isFetchedAfterMount: false,
    isLoadingError: false,
    isRefetchError: false,
    isRefetching: false,
    isStale: true,
    refetch: async () => {},
    remove: () => {},
    errorUpdateCount: 0,
    isPlaceholderData: false,
    isPreviousData: false,
    ...overrides,
  };
}

export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders as ComponentType, ...options }),
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
