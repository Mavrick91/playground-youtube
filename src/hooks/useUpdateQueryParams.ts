import { useRouter , useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { setQueryParam } from '~/lib/url-utils';
import { OptionsQueryParams } from '~/types/filters';

export default function useQueryParams(options?: OptionsQueryParams) {
  const router = useRouter();
  const params = useSearchParams();

  const updateQueryParams = useCallback(
    (key: string | Record<string, string | null>, value?: string | null) => {
      const newUrl = setQueryParam(key, value, options);
      router.push(newUrl, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
