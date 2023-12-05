import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { ComponentType } from 'react';
import { ModalProvider } from './providers/ModalProvider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders as ComponentType, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
