import React from 'react';
import { render, screen } from '@testing-library/react';
import PlaylistCard from './index';

describe('PlaylistCard function', () => {
  const playlist = {
    snippet: {
      thumbnails: {
        medium: {
          url: 'https://i.ytimg.com/vi/eNNHxQ78zyg/hqdefault.jpg',
        },
      },
      title: 'test_title',
    },
  };

  it('renders correctly', () => {
    render(<PlaylistCard playlist={playlist} />);
    expect(screen.getByText('test_title')).toBeInTheDocument();

    const thumbnailsBg = screen.getByAltText('Thumbnail playlist bg') as HTMLImageElement;
    const thumbnails = screen.getByAltText('Thumbnail playlist') as HTMLImageElement;
    expect(thumbnailsBg.src).toContain(encodeURIComponent(playlist.snippet.thumbnails.medium.url));
    expect(thumbnails.src).toContain(encodeURIComponent(playlist.snippet.thumbnails.medium.url));
  });
});
