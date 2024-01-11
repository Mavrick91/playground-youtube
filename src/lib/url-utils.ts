import { OptionsQueryParams } from "~/hooks/useUpdateQueryParams";

export function hasSearchQueryOrFilters(searchParams: Record<string, string>): boolean {
    const keysToCheck = ['q', 'topicId', 'regionCode', 'location', 'radius'];
    return keysToCheck.some(key => key in searchParams && !!searchParams[key]);
}

export function setQueryParam(
    key: string | Record<string, string | null>,
    value?: string | null,
    options?: OptionsQueryParams
): string {
    const searchParams = new URLSearchParams(window.location.search);

    if (typeof key === 'object') {
        Object.entries(key).forEach(([k, v]) => {
            if (v === null) {
                searchParams.delete(k);
            } else {
                searchParams.set(k, v);
            }
        });
    } else {
        if (value === null) {
            searchParams.delete(key);
        } else {
            searchParams.set(key, value!);
        }
    }

    if (options && 'deleteQ' in options) {
        searchParams.delete('q');
    } else if (options && 'deleteFilters' in options) {
        searchParams.delete('topicId');
        searchParams.delete('regionCode');
        searchParams.delete('location');
        searchParams.delete('radius');
    }

    const newSearchParams = searchParams.toString();
    const newUrl = `${window.location.pathname}${newSearchParams ? `?${newSearchParams}` : ''}`;

    return newUrl;
}

  