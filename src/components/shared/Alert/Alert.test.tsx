import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './index';

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert type="info" message="Test message" />);
    expect(screen.getByText('Alert!')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with the correct styles for each type', () => {
    const { rerender } = render(<Alert type="info" message="Test message" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
    );

    rerender(<Alert type="danger" message="Test message" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400'
    );

    rerender(<Alert type="success" message="Test message" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400'
    );

    rerender(<Alert type="warning" message="Test message" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'
    );

    rerender(<Alert type="dark" message="Test message" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
    );
  });
});
