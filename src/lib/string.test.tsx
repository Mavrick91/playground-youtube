import React from 'react';
import { render, screen } from '@testing-library/react';
import { descriptionElements } from './string';

describe('descriptionElements', () => {
  it('should render a paragraph with words when given a string without links', () => {
    const str = 'Hello world';
    render(<>{descriptionElements(str)}</>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('should render a link when given a string with a URL', () => {
    const str = 'Visit https://example.com';
    render(<>{descriptionElements(str)}</>);
    expect(screen.getByText('https://example.com')).toHaveAttribute('href', 'https://example.com');
  });

  it('should render a line break when given an empty string', () => {
    const str = '';
    render(<>{descriptionElements(str)}</>);
    expect(screen.getByTestId('line-break')).toBeInTheDocument();
  });
});
