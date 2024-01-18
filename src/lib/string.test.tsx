import React from 'react';
import { render, screen } from '@testing-library/react';
import { descriptionElements } from './string';

describe('descriptionElements', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    console.error.mockRestore();
  });

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

  it('should render a link when given a string with @@', () => {
    const str = '@@channel';
    render(<>{descriptionElements(str)}</>);
    const linkElement = screen.getByRole('link', { name: '@channel' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/channel/channel');
  });

  it('should render a link for the username when given a string with @@ followed by emojis without a space', async () => {
    // an &ZeroWithSpace; is added before to test this use case
    const str = '​@@gabescoffield😢😢😢Such beautiful words!!';
    render(<>{descriptionElements(str)}</>);
    const linkElement = screen.getByRole('link', { name: '@gabescoffield' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/channel/gabescoffield');

    const textElements = screen.queryAllByText(/😢😢😢Such beautiful words!!/i, { exact: false });
    textElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });

  it('renders username and link correctly with space in between', () => {
    const input = '@@tonymontes3869https://youtu.be/RAwvRsHLnoA?si=QMi7olukokLyHBY3';
    const { container } = render(<>{descriptionElements(input)}</>);

    const usernameElement = screen.getByText('@tonymontes3869');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement.getAttribute('href')).toBe('/channel/tonymontes3869');

    const linkElement = screen.getByText('https://youtu.be/RAwvRsHLnoA?si=QMi7olukokLyHBY3');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('https://youtu.be/RAwvRsHLnoA?si=QMi7olukokLyHBY3');

    const parentElement = container.firstChild;
    expect(parentElement?.textContent).toBe('@tonymontes3869 https://youtu.be/RAwvRsHLnoA?si=QMi7olukokLyHBY3');
  });
});
