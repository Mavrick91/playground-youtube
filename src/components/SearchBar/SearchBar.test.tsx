import React from 'react';
import SearchBar from './index';
import { useSearchVideo } from '~/endpoint/useSearchVideo';
import { useFilters } from '~/providers/FiltersProvider';
import {
  render,
  screen,
  fireEvent,
  createDefaultQueryResponse,
  waitFor,
} from '~/test-utils';

jest.mock('~/endpoint/useSearchVideo');
jest.mock('~/providers/FiltersProvider');

describe('SearchBar', () => {
  const mockUseSearchVideo = useSearchVideo as jest.MockedFunction<any>;
  const mockUseFilters = useFilters as jest.MockedFunction<typeof useFilters>;
  const mockResetFilters = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    mockUseSearchVideo.mockReturnValue(
      createDefaultQueryResponse({
        data: {
          items: [],
        },
        isLoading: false,
        isSuccess: true,
        refetch: mockRefetch,
      })
    );
    mockUseFilters.mockReturnValue({
      resetFilters: mockResetFilters,
      filters: {
        category: null,
        country: null,
        location: null,
      },
      setFilters: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    render(<SearchBar />);
    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toBeInTheDocument();
  });

  it('calls useSearchVideo with correct parameters', () => {
    render(<SearchBar />);
    expect(mockUseSearchVideo).toHaveBeenCalledWith({ q: '' });
  });

  it('calls resetFilters and refetch when form is submitted', async () => {
    const { user } = render(<SearchBar />);
    const searchInput = screen.getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    const buttonSubmit = screen.getByTestId('search-button');

    await user.click(buttonSubmit);

    await waitFor(() => {
      expect(mockResetFilters).toHaveBeenCalled();
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('disables the submit button when input is empty', () => {
    render(<SearchBar />);
    const buttonSubmit = screen.getByTestId('search-button');
    expect(buttonSubmit).toBeDisabled();
  });

  it('renders children when no data is provided', () => {
    render(
      <SearchBar>
        <div data-testid="test-child">Test Child</div>
      </SearchBar>
    );

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
  });

  it('clears the input when the delete button is clicked', () => {
    const { getByRole, getByTestId } = render(<SearchBar />);

    const searchInput: HTMLInputElement = getByRole(
      'textbox'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    const deleteButton: HTMLElement = getByTestId('search-input-delete');
    fireEvent.click(deleteButton);
    expect(searchInput.value).toBe('');
  });
});
