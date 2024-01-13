import React from 'react';
import { render, fireEvent, screen } from '~/test-utils';
import OrderFilter from './index';
import useQueryParams from '~/hooks/useUpdateQueryParams';

jest.mock('~/hooks/useUpdateQueryParams');

describe('OrderFilter', () => {
  const mockUpdateQueryParams = jest.fn();
  const mockGetQueryParam = jest.fn();

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: mockGetQueryParam,
    });
  });

  it('renders without crashing', () => {
    render(<OrderFilter />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls updateQueryParams when the filter button is clicked', async () => {
    const { user } = render(<OrderFilter />);

    const button = screen.getByRole('button', { name: /Order/i });

    await user.click(button);

    fireEvent.click(screen.getByText('Date'));

    expect(mockUpdateQueryParams).toHaveBeenNthCalledWith(1, 'order', 'date');

    await user.click(button);

    fireEvent.click(screen.getByText('Video Count'));

    expect(mockUpdateQueryParams).toHaveBeenNthCalledWith(2, {
      order: 'videoCount',
      publishedAfter: null,
      publishedBefore: null,
      videoDuration: null,
    });
  });

  it('calls updateQueryParams with null when the reset button is clicked', async () => {
    const { user } = render(<OrderFilter />);

    const button = screen.getByRole('button', { name: /Order/i });

    await user.click(button);

    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);

    expect(mockUpdateQueryParams).toHaveBeenCalledWith('order', null);
  });
});
