import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { ComponentType } from 'react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders as ComponentType, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
