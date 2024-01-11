import { hasSearchQueryOrFilters, setQueryParam } from './url-utils';

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
    let originalLocation: Location;

    beforeEach(() => {
      originalLocation = window.location;
      delete (window as any).location;
      window.location = {
        ...originalLocation,
        search: '?q=test&testKey3=testValue3',
        pathname: '/test',
      } as any;
    });

    afterEach(() => {
      window.location = originalLocation;
    });

    it('should set a single query parameter', () => {
      const newUrl = setQueryParam('testKey', 'testValue');
      expect(newUrl).toBe('/test?q=test&testKey3=testValue3&testKey=testValue');
    });

    it('should set multiple query parameters', () => {
      const newUrl = setQueryParam({
        testKey1: 'testValue1',
        testKey2: 'testValue2',
      });
      expect(newUrl).toBe(
        '/test?q=test&testKey3=testValue3&testKey1=testValue1&testKey2=testValue2'
      );
    });

    it('should delete a query parameter if its value is null (if a string)', () => {
      let newUrl = setQueryParam('q', null);
      expect(newUrl).toBe('/test?testKey3=testValue3');
    });

    it('should delete a query parameter if its value is null (if an object)', () => {
      const newUrl = setQueryParam({ testKey3: null });
      expect(newUrl).toBe('/test?q=test');
    });

    it('should delete the "q" query parameter if "deleteQ" is in options', () => {
      const newUrl = setQueryParam('testKey', 'testValue', { deleteQ: true });
      expect(newUrl).toBe('/test?testKey3=testValue3&testKey=testValue');
    });

    it('should delete the filter query parameters if "deleteFilters" is in options', () => {
      window.location = {
        ...originalLocation,
        search:
          '?q=test&topicId=1&regionCode=US&location=New%20York&radius=100',
        pathname: '/test',
      } as any;
      const newUrl = setQueryParam('testKey', 'testValue', {
        deleteFilters: true,
      });
      expect(newUrl).toBe('/test?q=test&testKey=testValue');
    });
  });
});
