import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoItem from '.';

describe('VideoItem', () => {
  const props = {
    channelThumbnail: 'http://example.com/channelThumbnail.jpg',
    videoTitle: 'Test Video Title',
    channelTitle: 'Test Channel Title',
    viewCount: '1234',
    publishedAt: '2022-01-01T00:00:00Z',
    thumbnail: {
      url: 'http://example.com/thumbnail.jpg',
      width: 480,
      height: 360,
    },
  };

  it('renders without crashing', () => {
    render(<VideoItem {...props} />);
    expect(screen.getByRole('img', { name: /thumbails/i })).toBeInTheDocument();
  });

  it('displays the correct video title', () => {
    render(<VideoItem {...props} />);
    expect(screen.getByText(props.videoTitle)).toBeInTheDocument();
  });

  it('displays the correct channel title', () => {
    render(<VideoItem {...props} />);
    expect(screen.getByText(props.channelTitle)).toBeInTheDocument();
  });

  it('displays the correct view count', () => {
    render(<VideoItem {...props} />);
    expect(screen.getByText(/1.2 K views/i)).toBeInTheDocument();
  });

  it('displays the correct published date', () => {
    render(<VideoItem {...props} />);
    expect(screen.getByText(/2 years ago/i)).toBeInTheDocument();
  });
});
