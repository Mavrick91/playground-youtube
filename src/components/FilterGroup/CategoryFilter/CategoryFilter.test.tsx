import React from 'react';
import { render, fireEvent, screen } from '~/test-utils';
import CategoryFilter from './index';
import useQueryParams from '~/hooks/useUpdateQueryParams';

jest.mock('~/hooks/useUpdateQueryParams');

describe('CategoryFilter', () => {
  const mockUpdateQueryParams = jest.fn();
  const mockGetQueryParam = jest.fn();

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: mockGetQueryParam,
    });
  });

  it('renders without crashing', () => {
    render(<CategoryFilter />);
  });

  it('calls updateQueryParams with correct parameters when a category is clicked', async () => {
    const { user } = render(<CategoryFilter />);

    const button = screen.getByRole('button', { name: /Categories/i });

    await user.click(button);
    await user.click(screen.getByText('Music'));

    fireEvent.click(screen.getByText('Christian music'));
    expect(mockUpdateQueryParams).toHaveBeenCalledWith(
      'topicId',
      expect.any(String)
    );
  });
});
