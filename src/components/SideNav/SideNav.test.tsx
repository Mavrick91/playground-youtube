import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideNav from './index';

describe('SideNav', () => {
  it('renders without crashing', () => {
    render(<SideNav />);
    expect(screen.getByLabelText('Sidenav')).toBeInTheDocument();
  });

  it('opens and closes the sidenav when the hamburger button is clicked', () => {
    render(<SideNav />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByLabelText('Sidenav')).toHaveClass('translate-x-0');
    fireEvent.click(button);
    expect(screen.getByLabelText('Sidenav')).toHaveClass('-translate-x-full');
  });

  it('closes the sidenav when a link is clicked', () => {
    render(<SideNav />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const link = screen.getByText('Home');
    fireEvent.click(link);
    expect(screen.getByLabelText('Sidenav')).toHaveClass('-translate-x-full');
  });
});
