import { SEARCH_PARAMS } from '~/constants/searchParams';
import { OptionsQueryParams } from '~/types/filters';

export function hasSearchQueryOrFilters(searchParams: Record<string, string>): boolean {
  return SEARCH_PARAMS.some(key => key in searchParams && !!searchParams[key]);
}

export function setQueryParam(
  key: string | Record<string, string | null>,
  value?: string | null,
  options?: OptionsQueryParams
): string {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_APP_URL}${options?.baseURL ? options.baseURL : window.location.pathname}`
  );
  const searchParams = new URLSearchParams(window.location.search);

  if (typeof key === 'object') {
    Object.entries(key).forEach(([k, v]) => {
      if (v === null) {
        searchParams.delete(k);
      } else {
        searchParams.set(k, v);
      }
    });
  } else if (value === null) {
    searchParams.delete(key);
  } else {
    searchParams.set(key, value!);
  }

  if (options && 'deleteQ' in options) {
    searchParams.delete('q');
  } else if (options && 'deleteFilters' in options) {
    searchParams.delete('topicId');
    searchParams.delete('regionCode');
    searchParams.delete('location');
    searchParams.delete('locationRadius');
  }

  url.search = searchParams.toString();

  return url.toString();
}

export function createURL(path: string, params: Record<string, string>) {
  const url = new URL(path, process.env.NEXT_PUBLIC_APP_URL);
  const urlParams = new URLSearchParams(params);

  url.search = urlParams.toString();

  return url;
}
