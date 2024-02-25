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
    render(<VideoFeature video={mockVideo} selectedChoice="liked" />);
    expect(screen.getByText('Videos "liked"')).toBeInTheDocument();
    expect(screen.getByText('WonderWhizzes')).toBeInTheDocument();
    expect(screen.getByText('100 vidéos • Aucune vue')).toBeInTheDocument();
  });

  it('displays the correct video thumbnail', () => {
    render(<VideoFeature video={mockVideo} selectedChoice="liked" />);
    const expectedUrl = 'http://example.com/video1.jpg';
    const encodedUrl = encodeURIComponent(expectedUrl);
    expect((screen.getByAltText('Featured video') as HTMLImageElement).src).toContain(encodedUrl);
  });

  it('renders the correct link when selectedChoice is "liked"', () => {
    render(<VideoFeature video={mockVideo} selectedChoice="liked" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/watch?v=1&list=LL');
  });

  it('renders the correct link when selectedChoice is "disliked"', () => {
    render(<VideoFeature video={mockVideo} selectedChoice="disliked" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/watch?v=1');
  });

  it('renders the "read-all" selectedChoice is "liked"', () => {
    render(<VideoFeature video={mockVideo} selectedChoice="liked" />);
    expect(screen.getByTestId('read-all')).toBeInTheDocument();
  });

  it('does not render the "read-all" selectedChoice is "disliked"', () => {
    render(<VideoFeature video={mockVideo} selectedChoice="disliked" />);
    expect(screen.queryByTestId('read-all')).not.toBeInTheDocument();
  });

  it('renders the "Tout lire" button when selectedChoice is "liked"', () => {
    render(<VideoFeature video={mockVideo} selectedChoice="liked" />);
    expect(screen.getByText('Read all')).toBeInTheDocument();
  });

  it('does not render the "Tout lire" button when selectedChoice is "disliked"', () => {
    render(<VideoFeature video={mockVideo} selectedChoice="disliked" />);
    expect(screen.queryByText('Read all')).not.toBeInTheDocument();
  });
});
