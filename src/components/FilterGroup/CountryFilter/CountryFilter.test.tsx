import React from 'react';
import { render, screen, fireEvent, waitFor } from '~/test-utils';
import CountryFilter from './index';
import useUpdateQueryParams from '~/hooks/useUpdateQueryParams';

jest.mock('~/hooks/useUpdateQueryParams');

const mockUseUpdateQueryParams = useUpdateQueryParams as jest.MockedFunction<
  typeof useUpdateQueryParams
>;

const mockUpdateQueryParams = jest.fn();

describe('CountryFilter', () => {
  beforeEach(() => {
    mockUseUpdateQueryParams.mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CountryFilter />);

    const buttonElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it('displays an input when dropdown is opened', async () => {
    const { user } = render(<CountryFilter />);

    const buttonElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements = screen.getByRole('textbox');
    expect(inputElements).toBeInTheDocument();
  });

  it('auto-focuses the SearchInput when the dropdown is opened', async () => {
    const { user } = render(<CountryFilter />);

    const buttonElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements = screen.getByRole('textbox');
    expect(document.activeElement).toBe(inputElements);
  });

  it('calls updateQueryParams when DropdownMenuItem is clicked', async () => {
    mockUseUpdateQueryParams.mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: jest.fn(),
    });

    const { user } = render(<CountryFilter />);

    const buttonElement: HTMLElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements: HTMLInputElement = screen.getByRole('textbox');

    await user.type(inputElements, 'France');
    await user.click(screen.getByText('France'));

    await waitFor(() => {
      expect(mockUpdateQueryParams).toHaveBeenCalledWith(
        'regionCode',
        expect.any(String)
      );
    });
  });

  it('resets the input value when a country is selected', async () => {
    const { user } = render(<CountryFilter />);

    const buttonElement: HTMLElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements: HTMLInputElement = screen.getByRole('textbox');
    await user.type(inputElements, 'France');

    fireEvent.click(screen.getByText('France'));

    expect(inputElements.value).toBe('');
  });

  it('filters the list of countries based on the input value', async () => {
    const { user } = render(<CountryFilter />);

    const buttonElement: HTMLElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements: HTMLInputElement = screen.getByRole('textbox');
    await user.type(inputElements, 'Fr');
    let countryElements = screen.getAllByRole('menuitem');
    expect(countryElements).toHaveLength(7);

    await user.type(inputElements, 'ance');
    countryElements = screen.getAllByRole('menuitem');
    expect(countryElements).toHaveLength(2);
  });

  it('calls updateQueryParams with null when the reset button is clicked', async () => {
    const { user } = render(<CountryFilter />);

    const buttonElement: HTMLElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);

    expect(mockUpdateQueryParams).toHaveBeenCalledWith('regionCode', null);
  });
});
