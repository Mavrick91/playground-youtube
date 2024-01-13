import React from 'react';
import DurationFilter from './index';
import useQueryParams from '~/hooks/useUpdateQueryParams';
import { VIDEO_DURATION_OPTIONS } from '~/constants/duration';
import { render, screen, fireEvent } from '~/test-utils';

jest.mock('~/hooks/useUpdateQueryParams');

describe('DurationFilter', () => {
  const mockUpdateQueryParams = jest.fn();
  const mockGetQueryParam = jest.fn();

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: mockGetQueryParam,
    });
  });

  it('renders without crashing', () => {
    render(<DurationFilter />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls updateQueryParams when a dropdown menu item is clicked', async () => {
    const { user } = render(<DurationFilter />);
    const button = screen.getByRole('button', { name: /Duration/i });

    await user.click(button);

    const menuItemElement = screen.getByRole('menuitem', {
      name: VIDEO_DURATION_OPTIONS[0].label,
    });
    fireEvent.click(menuItemElement);

    expect(mockUpdateQueryParams).toHaveBeenCalledWith(
      'videoDuration',
      VIDEO_DURATION_OPTIONS[0].value
    );
  });

  it('calls updateQueryParams with null when the reset button is clicked', async () => {
    const { user } = render(<DurationFilter />);
    const button = screen.getByRole('button', { name: /Duration/i });

    await user.click(button);

    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);

    expect(mockUpdateQueryParams).toHaveBeenCalledWith('videoDuration', null);
  });
});
