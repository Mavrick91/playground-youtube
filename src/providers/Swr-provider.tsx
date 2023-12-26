'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import { fetcher } from '~/lib/fetcher';

interface SWRProviderProps {
  children: ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps): JSX.Element => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
