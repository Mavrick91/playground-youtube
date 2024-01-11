import { renderHook } from '@testing-library/react';
import { useSearchParams, useRouter } from 'next/navigation';
import useQueryParams from './useUpdateQueryParams';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useQueryParams', () => {
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseSearchParams = useSearchParams as jest.MockedFunction<any>;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  it("updateQueryParams updates the query parameters when it's a string", () => {
    const { result } = renderHook(() => useQueryParams());
    result.current.updateQueryParams('testKey', 'testValue');

    expect(mockUseRouter().push).toHaveBeenCalledWith('/?testKey=testValue');
  });

  it("updateQueryParams updates the query parameters when it's an object", () => {
    const { result } = renderHook(() => useQueryParams());
    result.current.updateQueryParams({
      testKey: 'testValue',
      testKey2: 'testValue2',
    });

    expect(mockUseRouter().push).toHaveBeenCalledWith(
      '/?testKey=testValue&testKey2=testValue2'
    );
  });

  it('getQueryParam returns the correct query parameter value', () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams('testKey=testValue')
    );

    const { result } = renderHook(() => useQueryParams());
    const value = result.current.getQueryParam('testKey');

    expect(value).toBe('testValue');
  });

  it('getQueryParam returns null if the query parameter does not exist', () => {
    const { result } = renderHook(() => useQueryParams());
    const value = result.current.getQueryParam('nonexistentKey');

    expect(value).toBeNull();
  });
});
