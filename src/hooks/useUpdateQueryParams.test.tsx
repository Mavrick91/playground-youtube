import { renderHook } from '@testing-library/react';
import { useSearchParams, useRouter, ReadonlyURLSearchParams } from 'next/navigation';
import useQueryParams from './useUpdateQueryParams';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useQueryParams', () => {
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);
    mockUseSearchParams.mockReturnValue({
      [Symbol.iterator]: () => new URLSearchParams()[Symbol.iterator](),
    } as ReadonlyURLSearchParams);
  });

  it("updateQueryParams updates the query parameters when it's a string", () => {
    const { result } = renderHook(() => useQueryParams());
    result.current.updateQueryParams('testKey', 'testValue');

    expect(mockUseRouter().push).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_APP_URL}/?testKey=testValue`, {
      shallow: true,
    });
  });

  it("updateQueryParams updates the query parameters when it's an object", () => {
    const { result } = renderHook(() => useQueryParams());
    result.current.updateQueryParams({
      testKey: 'testValue',
      testKey2: 'testValue2',
    });

    expect(mockUseRouter().push).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_APP_URL}/?testKey=testValue&testKey2=testValue2`,
      { shallow: true }
    );
  });

  it('getQueryParam returns the correct query parameter value', () => {
    mockUseSearchParams.mockReturnValue({
      [Symbol.iterator]: () => new URLSearchParams('testKey=testValue')[Symbol.iterator](),
      get: (key: string) => (key === 'testKey' ? 'testValue' : undefined),
    } as ReadonlyURLSearchParams);

    const { result } = renderHook(() => useQueryParams());
    const value = result.current.getQueryParam('testKey');

    expect(value).toBe('testValue');
  });

  it('getQueryParam returns undefined if the query parameter does not exist', () => {
    mockUseSearchParams.mockReturnValue({
      [Symbol.iterator]: () => new URLSearchParams('testKey=testValue')[Symbol.iterator](),
      get: (key: string) => (key === 'testKey' ? 'testValue' : undefined),
    } as ReadonlyURLSearchParams);

    const { result } = renderHook(() => useQueryParams());
    const value = result.current.getQueryParam('nonexistentKey');

    expect(value).toBeUndefined();
  });
});
