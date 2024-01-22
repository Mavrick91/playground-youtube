import { render, screen } from '@testing-library/react';
import { getPlaylistItems } from '~/services/playlistService';
import PlaylistCard from './index';

jest.mock('~/services/playlistService');

describe('PlaylistCard function', () => {
  const playlist = {
    id: 'test_id',
    snippet: {
      thumbnails: {
        medium: {
          url: 'https://i.ytimg.com/vi/eNNHxQ78zyg/hqdefault.jpg',
        },
      },
      title: 'test_title',
    },
    contentDetails: {
      itemCount: 10,
    },
  };

  it('renders correctly', async () => {
    const playlistItems = {
      items: [
        {
          contentDetails: {
            videoId: 'eNNHxQ78zyg',
          },
        },
      ],
    };

    (getPlaylistItems as jest.Mock).mockResolvedValueOnce(playlistItems);
    const jsx = await PlaylistCard({ playlist });
    render(jsx);

    expect(screen.getByText('test_title')).toBeInTheDocument();

    const thumbnailsBg = screen.getByAltText('Thumbnail playlist bg') as HTMLImageElement;
    const thumbnails = screen.getByAltText('Thumbnail playlist') as HTMLImageElement;
    expect(thumbnailsBg.src).toContain(encodeURIComponent(playlist.snippet.thumbnails.medium.url));
    expect(thumbnails.src).toContain(encodeURIComponent(playlist.snippet.thumbnails.medium.url));

    expect(screen.getByText(`${playlist.contentDetails.itemCount} videos`)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/watch?v=${playlistItems.items[0].contentDetails.videoId}&list=${playlist.id}`
    );
  });
});
