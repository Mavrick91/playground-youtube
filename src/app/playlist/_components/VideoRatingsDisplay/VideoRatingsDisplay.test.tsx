import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import VideoRatingsDisplay from './index';

describe('VideoRatingsDisplay', () => {
  const mockLikedVideos = {
    items: [
      {
        id: '1',
        snippet: {
          title: 'Liked Video 1',
          thumbnails: {
            high: {
              url: 'http://example.com/video1.jpg',
            },
          },
        },
      },
    ],
  };

  const mockDislikedVideos = {
    items: [
      {
        id: '2',
        snippet: {
          title: 'Disliked Video 1',
          thumbnails: {
            high: {
              url: 'http://example.com/video2.jpg',
            },
          },
        },
      },
    ],
  };

  it('renders without crashing', () => {
    render(<VideoRatingsDisplay likedVideos={mockLikedVideos} dislikedVideos={mockDislikedVideos} />);
    expect(screen.getByText('Liked Video 1')).toBeInTheDocument();
  });

  it('switches to disliked videos when choice is updated', () => {
    render(<VideoRatingsDisplay likedVideos={mockLikedVideos} dislikedVideos={mockDislikedVideos} />);
    fireEvent.click(screen.getByText('Disliked'));
    expect(screen.getByText('Disliked Video 1')).toBeInTheDocument();
  });
});
