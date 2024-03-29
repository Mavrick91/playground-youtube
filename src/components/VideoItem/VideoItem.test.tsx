import React from 'react';
import { render, screen } from '~/test-utils';
import Link from 'next/link';
import VideoItem from './index';

jest.mock('next/link', () => jest.fn(({ children }) => children));

describe('VideoItem', () => {
  const baseProps = {
    id: 'test-id',
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
    render(<VideoItem {...baseProps} />);
    expect(screen.getByRole('img', { name: /thumbails/i })).toBeInTheDocument();
  });

  it('displays the correct video title', () => {
    render(<VideoItem {...baseProps} />);
    expect(screen.getByText(baseProps.videoTitle)).toBeInTheDocument();
  });

  it('displays the correct channel title', () => {
    render(<VideoItem {...baseProps} />);
    expect(screen.getByText(baseProps.channelTitle)).toBeInTheDocument();
  });

  it('displays the correct view count', () => {
    render(<VideoItem {...baseProps} />);
    expect(screen.getByText(/1.2 K views/i)).toBeInTheDocument();
  });

  it('displays the correct published date', () => {
    render(<VideoItem {...baseProps} />);
    expect(screen.getByText(/2 years ago/i)).toBeInTheDocument();
  });

  it('passes the correct props to Link', () => {
    render(<VideoItem {...baseProps} />);

    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/watch?v=test-id',
      }),
      {}
    );
  });

  it('does not render when thumbnail height is not provided', () => {
    const props = {
      ...baseProps,
      thumbnail: {
        url: 'http://example.com/thumbnail.jpg',
        width: 480,
      },
    };

    const { container } = render(<VideoItem {...props} />);

    expect(container.firstChild).toBeNull();
  });

  it('does not render when thumbnail width is not provided', () => {
    const props = {
      ...baseProps,
      thumbnail: {
        url: 'http://example.com/thumbnail.jpg',
        height: 360,
      },
    };

    const { container } = render(<VideoItem {...props} />);

    expect(container.firstChild).toBeNull();
  });

  it('does not render when channel thumbnail not provided', () => {
    const props = {
      ...baseProps,
      channelThumbnail: null,
    };

    render(<VideoItem {...props} />);

    expect(screen.queryByAltText('channel')).not.toBeInTheDocument();
  });

  it('does not render channel title when it is not provided', () => {
    const props = {
      ...baseProps,
      channelTitle: null,
    };

    render(<VideoItem {...props} />);

    expect(screen.queryByText('Test Channel Title')).not.toBeInTheDocument();
  });

  it('does render channel title when it is provided', () => {
    const props = {
      ...baseProps,
    };

    render(<VideoItem {...props} />);

    expect(screen.queryByText('Test Channel Title')).toBeInTheDocument();
  });
});
