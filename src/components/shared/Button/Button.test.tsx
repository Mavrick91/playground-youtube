import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays the correct text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('shows a loading icon when isLoading is true', () => {
    render(<Button isLoading={true}>Test Button</Button>);
    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
  });
});
