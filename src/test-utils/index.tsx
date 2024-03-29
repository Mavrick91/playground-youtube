import { RenderOptions, render } from '@testing-library/react';
import React, { ComponentType } from 'react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function AllTheProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: AllTheProviders as ComponentType, ...options }),
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
