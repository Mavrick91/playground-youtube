import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { setQueryParam } from '~/lib/url-utils';
import { useSearchParams } from 'next/navigation';

export type OptionsQueryParams =
  | {
      deleteQ: boolean;
    }
  | {
      deleteFilters: boolean;
    };

export default function useQueryParams(options?: OptionsQueryParams) {
  const router = useRouter();
  const params = useSearchParams();

  const updateQueryParams = useCallback(
    (key: string | Record<string, string | null>, value?: string | null) => {
      const newUrl = setQueryParam(key, value, options);
      router.push(newUrl, {
        shallow: true,
      });
    },
    [options, router]
  );

  const getQueryParam = useCallback(
    (key: string) => {
      if (params.get(key)) {
        return params.get(key) as string;
      }
      return undefined;
    },
    [params]
  );

  return { updateQueryParams, getQueryParam };
}
