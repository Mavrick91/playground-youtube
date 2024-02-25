import { render, screen } from '@testing-library/react';
import React from 'react';
import Video from './index';

describe('Video', () => {
  const mockVideo = {
    id: 'video1',
    snippet: {
      title: 'Video 1',
      channelTitle: 'Channel 1',
      thumbnails: {
        high: {
          url: 'http://example.com/video1.jpg',
        },
      },
      publishedAt: '2022-01-01T00:00:00Z',
    },
    statistics: {
      viewCount: '1000',
    },
  };

  it('renders without crashing', () => {
    render(<Video video={mockVideo} index={1} />);
    expect(screen.getByText('Video 1')).toBeInTheDocument();
    expect(screen.getByText('Channel 1 • 1.0 K views • 2 years ago')).toBeInTheDocument();
  });

  it('displays the correct video thumbnail', () => {
    render(<Video video={mockVideo} index={1} />);
    const expectedUrl = 'http://example.com/video1.jpg';
    const encodedUrl = encodeURIComponent(expectedUrl);
    expect((screen.getByAltText('Video thumbnail') as HTMLImageElement).src).toContain(encodedUrl);
  });

  it('displays the correct index', () => {
    render(<Video video={mockVideo} index={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders the correct link', () => {
    render(<Video video={mockVideo} index={1} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/watch?v=video1');
  });
});
