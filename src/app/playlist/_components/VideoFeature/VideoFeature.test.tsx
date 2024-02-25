import { render, screen } from '@testing-library/react';
import React from 'react';
import VideoFeature from './index';

describe('VideoFeature', () => {
  const mockVideo = {
    items: [
      {
        id: '1',
        snippet: {
          title: 'Video 1',
          thumbnails: {
            high: {
              url: 'http://example.com/video1.jpg',
            },
          },
        },
      },
    ],
    pageInfo: {
      totalResults: 100,
    },
  };

  it('renders without crashing', () => {
    render(<VideoFeature video={mockVideo} />);
    expect(screen.getByText('Vidéos "Liked"')).toBeInTheDocument();
    expect(screen.getByText('WonderWhizzes')).toBeInTheDocument();
    expect(screen.getByText('100 vidéos • Aucune vue')).toBeInTheDocument();
  });

  it('displays the correct video thumbnail', () => {
    render(<VideoFeature video={mockVideo} />);
    expect(screen.getByAltText('Featured video')).toHaveAttribute('src', 'http://example.com/video1.jpg');
  });
});
