import { render, screen } from '@testing-library/react';
import { getPlaylist } from '~/services/playlistService';
import PlaylistCard from '~/components/PlaylistCard';
import PlaylistPage from '.';

jest.mock('~/services/playlistService');
jest.mock('~/components/PlaylistCard', () => jest.fn());

beforeEach(() => {
  jest.resetAllMocks();
});

describe('PlaylistPage function', () => {
  it('renders playlists correctly', async () => {
    const mockChannelId = 'ABC123';
    const mockPlaylists = {
      items: [{ id: '1' }, { id: '2' }],
    };
    (getPlaylist as jest.Mock).mockResolvedValue(mockPlaylists);

    const jsx = await PlaylistPage({ channelId: mockChannelId });
    render(jsx);

    expect(PlaylistCard).toHaveBeenCalledTimes(2);
  });

  test('renders ContentNoItems when there are no playlist items', async () => {
    const mockChannelId = 'ABC123';
    const mockPlaylists = {
      items: [],
    };
    (getPlaylist as jest.Mock).mockResolvedValue(mockPlaylists);

    const jsx = await PlaylistPage({ channelId: mockChannelId });
    render(jsx);

    expect(screen.getByTestId('content-no-items')).toBeInTheDocument();
  });
});
