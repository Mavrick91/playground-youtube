import { render, screen, fireEvent } from '@testing-library/react';
import DescriptionVideo from './index';
import { formatNumber } from '~/lib/utils';

describe('DescriptionVideo', () => {
  const props = {
    viewCount: '1234',
    publishedAt: '2022-01-01T00:00:00Z',
    description: 'This is a test description\nWith a new line\nhttp://example.com',
  };

  it('renders the view count, published date, and description', () => {
    render(<DescriptionVideo {...props} />);

    expect(screen.getByText(new RegExp(formatNumber('1234')))).toBeInTheDocument();
    expect(screen.getByText(/ago/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/i)).toBeInTheDocument();
    expect(screen.getByText(/With a new line/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /http:\/\/example.com/i })).toBeInTheDocument();
  });

  it('expands and collapses the description when clicked', () => {
    render(<DescriptionVideo {...props} />);

    const button = screen.getByRole('button');
    const descriptionDiv = screen.getByText(/This is a test description/i).parentElement;

    expect(descriptionDiv).toHaveClass('max-h-[3.6rem]');

    fireEvent.click(button);

    expect(descriptionDiv).not.toHaveClass('max-h-[3.6rem]');

    fireEvent.click(button);

    expect(descriptionDiv).toHaveClass('max-h-[3.6rem]');
  });
});
