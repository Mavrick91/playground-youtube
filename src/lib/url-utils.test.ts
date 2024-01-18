import { OptionsQueryParams } from '~/types/filters';
import { createURL, hasSearchQueryOrFilters, setQueryParam } from './url-utils';

describe('url-utils', () => {
  describe('hasSearchQueryOrFilters', () => {
    it('should return true if there are search query or filters', () => {
      const searchParams = {
        q: 'test',
        topicId: '1',
        regionCode: 'US',
        location: 'New York',
        radius: '100',
      };
      expect(hasSearchQueryOrFilters(searchParams)).toBe(true);
    });

    it('should return false if there are no search query or filters', () => {
      const searchParams = { otherKey: 'test' };
      expect(hasSearchQueryOrFilters(searchParams)).toBe(false);
    });
  });

  describe('setQueryParam', () => {
    let originalLocation: Location | undefined;

    beforeEach(() => {
      originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          ...(originalLocation as Location),
          search: '?q=test&testKey3=testValue3',
          pathname: '/test',
        },
      });
    });

    afterEach(() => {
      window.location = originalLocation as Location;
    });

    it('should set a single query parameter', () => {
      const newUrl = setQueryParam('testKey', 'testValue');
      expect(newUrl).toBe(`${process.env.NEXT_PUBLIC_APP_URL}/test?q=test&testKey3=testValue3&testKey=testValue`);
    });

    it('should set the query parameter correctly', () => {
      window.location = { pathname: '/testPath', search: '?testKey=testValue' } as Location;

      const key = 'newKey';
      const value = 'newValue';
      const options: OptionsQueryParams = { baseURL: '/newPath' };

      const newUrl = setQueryParam(key, value, options);

      expect(newUrl).toBe(
        `${process.env.NEXT_PUBLIC_APP_URL}${options.baseURL}${window.location.search}&${key}=${value}`
      );
    });

    it('should set multiple query parameters', () => {
      const newUrl = setQueryParam({
        testKey1: 'testValue1',
        testKey2: 'testValue2',
      });
      expect(newUrl).toBe(
        `${process.env.NEXT_PUBLIC_APP_URL}/test?q=test&testKey3=testValue3&testKey1=testValue1&testKey2=testValue2`
      );
    });

    it('should delete a query parameter if its value is null (if a string)', () => {
      const newUrl = setQueryParam('q', null);
      expect(newUrl).toBe(`${process.env.NEXT_PUBLIC_APP_URL}/test?testKey3=testValue3`);
    });

    it('should delete a query parameter if its value is null (if an object)', () => {
      const newUrl = setQueryParam({ testKey3: null });
      expect(newUrl).toBe(`${process.env.NEXT_PUBLIC_APP_URL}/test?q=test`);
    });

    it('should delete the "q" query parameter if "deleteQ" is in options', () => {
      const newUrl = setQueryParam('testKey', 'testValue', { deleteQ: true });
      expect(newUrl).toBe(`${process.env.NEXT_PUBLIC_APP_URL}/test?testKey3=testValue3&testKey=testValue`);
    });

    it('should delete the filter query parameters if "deleteFilters" is in options', () => {
      window.location = {
        ...originalLocation,
        search: '?q=test&topicId=1&regionCode=US&location=New%20York&radius=100',
        pathname: '/test',
      } as Location;
      const newUrl = setQueryParam('testKey', 'testValue', {
        deleteFilters: true,
      });
      expect(newUrl).toBe(`${process.env.NEXT_PUBLIC_APP_URL}/test?q=test&testKey=testValue`);
    });
  });
  describe('createURL', () => {
    let originalUrl: string | undefined;

    beforeAll(() => {
      originalUrl = process.env.NEXT_PUBLIC_APP_URL;
    });

    afterAll(() => {
      process.env.NEXT_PUBLIC_APP_URL = originalUrl;
    });

    it('creates a URL with the correct path and query parameters', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

      const path = '/test';
      const params = { param1: 'value1', param2: 'value2' };

      const url = createURL(path, params);

      expect(url.pathname).toBe(path);
      expect(url.searchParams.get('param1')).toBe('value1');
      expect(url.searchParams.get('param2')).toBe('value2');
    });
  });
});
