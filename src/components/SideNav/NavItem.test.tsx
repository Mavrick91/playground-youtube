import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { NavItem } from './NavItem';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavItem', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders without crashing', () => {
    render(
      <NavItem text="Home" icon={<span />} href="/" onClick={mockOnClick} />
    );
    expect(screen.getByTestId('nav-item-Home')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(
      <NavItem text="Home" icon={<span />} href="/" onClick={mockOnClick} />
    );
    const link = screen.getByTestId('nav-item-Home');
    fireEvent.click(link);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('has the active class when the current path matches the href', () => {
    (usePathname as jest.Mock).mockReturnValue('/home');
    render(
      <NavItem text="Home" icon={<span />} href="/home" onClick={mockOnClick} />
    );
    const link = screen.getByTestId('nav-item-Home');
    expect(link).toHaveClass('bg-gray-100 dark:bg-gray-700');
  });

  it('does not have the active class when the current path does not match the href', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(
      <NavItem text="Home" icon={<span />} href="/home" onClick={mockOnClick} />
    );
    const link = screen.getByTestId('nav-item-Home');
    expect(link).not.toHaveClass('bg-gray-100 dark:bg-gray-700');
  });
});
