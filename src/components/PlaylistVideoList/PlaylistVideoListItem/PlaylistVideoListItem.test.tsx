import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import PlaylistVideoListItem from '.';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(),
}));

const baseProps = {
  thumbnail: 'https://i.ytimg.com/vi/i1bBzrlZUyY/mqdefault.jpg',
  title: 'A test video',
  channelTitle: 'Test Channel',
  index: 1,
  videoId: 'test-videoId',
  playlistId: 'test-playlistId',
};

describe('Test PlaylistVideoListItem', () => {
  const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue(new ReadonlyURLSearchParams(new URLSearchParams({ v: 'test-videoId' })));
  });

  it('renders without crashing', () => {
    const { container } = render(<PlaylistVideoListItem {...baseProps} />);

    expect(container).toBeTruthy();
    expect(screen.getByText(/Test Video/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Channel/i)).toBeInTheDocument();
  });

  it('renders the Link component with correct href', () => {
    render(<PlaylistVideoListItem {...baseProps} />);

    const linkElement = screen.getByRole('link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/watch?v=test-videoId&list=test-playlistId');
  });

  it('renders the Play component when videoId matches params id', () => {
    render(<PlaylistVideoListItem {...baseProps} />);

    const svgElement = screen.getByTestId('lucide-play');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('lucide-play');
  });
});
