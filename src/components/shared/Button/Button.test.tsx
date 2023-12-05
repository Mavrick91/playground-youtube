import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has the correct base class', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'text-white font-medium text-center focus:outline-none focus:ring-4 flex gap-2 items-center w-full justify-center'
    );
  });

  it('renders children correctly', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Test Button');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('has the correct size class', () => {
    render(<Button size="sm">Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3 py-2 text-sm');
  });

  it('has the correct rounded class', () => {
    render(<Button roundedFull>Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-full');
  });

  it('has the correct type class', () => {
    render(<Button buttonType="dark">Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-gray-800 hover:bg-gray-900 focus:ring-gray-300'
    );
  });

  it('displays loading state correctly', () => {
    render(<Button isLoading={true}>Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    const spinner = screen.getByTestId('loading-icon');
    expect(spinner).toBeInTheDocument();
  });

  it('does not display loading state when isLoading is false', () => {
    render(<Button isLoading={false}>Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    const spinner = screen.queryByTestId('loading-icon');
    expect(spinner).not.toBeInTheDocument();
  });
});
