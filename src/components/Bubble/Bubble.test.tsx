import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Bubble from './index';

describe('Bubble', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    render(<Bubble onClick={mockOnClick}>Test</Bubble>);
  });

  it('renders without crashing', () => {
    const bubbleElement = screen.getByText('Test');
    expect(bubbleElement).toBeInTheDocument();
  });

  it('renders correct children', () => {
    const bubbleElement = screen.getByText('Test');
    expect(bubbleElement).toBeInTheDocument();
  });

  it('calls onClick when X icon is clicked', () => {
    const xIconElement = screen.getByTestId('bubble-delete');
    fireEvent.click(xIconElement);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
