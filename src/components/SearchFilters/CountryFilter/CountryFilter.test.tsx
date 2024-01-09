import React from 'react';
import { render, screen, fireEvent } from '~/test-utils';
import CountryFilter from './index';

describe('CountryFilter', () => {
  it('renders without crashing', () => {
    const updateFilter = jest.fn();
    render(<CountryFilter updateFilter={updateFilter} />);

    const buttonElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it('displays an input when dropdown is opened', async () => {
    const updateFilter = jest.fn();
    const { user } = render(<CountryFilter updateFilter={updateFilter} />);

    const buttonElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements = screen.getByRole('textbox');
    expect(inputElements).toBeInTheDocument();
  });

  it('auto-focuses the SearchInput when the dropdown is opened', async () => {
    const updateFilter = jest.fn();
    const { user } = render(<CountryFilter updateFilter={updateFilter} />);

    const buttonElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements = screen.getByRole('textbox');
    expect(document.activeElement).toBe(inputElements);
  });

  it('calls updateFilter when a country is selected', async () => {
    const updateFilter = jest.fn();
    const { user } = render(<CountryFilter updateFilter={updateFilter} />);

    const buttonElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements = screen.getByRole('textbox');
    await user.type(inputElements, 'France');

    fireEvent.click(screen.getByText('France'));

    expect(updateFilter).toHaveBeenCalledWith({
      id: 'FR',
      label: 'France',
    });
  });

  it('resets the input value when a country is selected', async () => {
    const updateFilter = jest.fn();
    const { user } = render(<CountryFilter updateFilter={updateFilter} />);

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
    const updateFilter = jest.fn();
    const { user } = render(<CountryFilter updateFilter={updateFilter} />);

    const buttonElement: HTMLElement = screen.getByRole('button', {
      name: /Videos available in a specific country/i,
    });
    await user.click(buttonElement);

    const inputElements: HTMLInputElement = screen.getByRole('textbox');
    await user.type(inputElements, 'Fr');
    let countryElements = screen.getAllByRole('menuitem');
    expect(countryElements).toHaveLength(6);

    await user.type(inputElements, 'ance');
    countryElements = screen.getAllByRole('menuitem');
    expect(countryElements).toHaveLength(1);
  });
});
