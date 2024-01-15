import React from 'react';
import SearchBar from './index';
import { render, screen, fireEvent, waitFor } from '~/test-utils';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import useQueryParams from '~/hooks/useUpdateQueryParams';

jest.mock('~/hooks/useUpdateQueryParams');
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(),
}));

describe('SearchBar', () => {
  const mockUpdateQueryParams = jest.fn();
  const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
    });
    mockUseSearchParams.mockReturnValue(new ReadonlyURLSearchParams(new URLSearchParams()));
  });

  it('renders without crashing', () => {
    render(<SearchBar />);
    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toBeInTheDocument();
  });

  it('calls updateQueryParams with correct parameters when form is submitted', async () => {
    const { user } = render(<SearchBar />);
    const searchInput = screen.getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    const buttonSubmit = screen.getByTestId('search-button');
    await user.click(buttonSubmit);

    expect(mockUpdateQueryParams).toHaveBeenCalledWith('q', 'test');
  });

  it('sets the input value based on search params', () => {
    mockUseSearchParams.mockReturnValue(new ReadonlyURLSearchParams(new URLSearchParams('q=test')));

    render(<SearchBar />);
    const searchInput: HTMLInputElement = screen.getByRole('textbox');

    expect(searchInput.value).toBe('test');
  });

  it('disables the submit button when input is empty', () => {
    render(<SearchBar />);
    const buttonSubmit = screen.getByTestId('search-button');
    expect(buttonSubmit).toBeDisabled();
  });

  it('clears the input when the delete button is clicked', () => {
    const { getByRole, getByTestId } = render(<SearchBar />);

    const searchInput: HTMLInputElement = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    const deleteButton: HTMLElement = getByTestId('search-input-delete');
    fireEvent.click(deleteButton);
    expect(searchInput.value).toBe('');
  });
});
