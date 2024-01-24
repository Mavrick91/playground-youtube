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

  test('renders ContentNoItems when no playlists have itemCount > 0', async () => {
    const mockChannelId = 'ABC123';
    (getPlaylist as jest.Mock).mockResolvedValue({
      items: [
        { id: '1', contentDetails: { itemCount: 0 } },
        { id: '2', contentDetails: { itemCount: 0 } },
      ],
    });

    const jsx = await PlaylistPage({ channelId: mockChannelId });
    render(jsx);

    expect(PlaylistCard).not.toHaveBeenCalled();
    expect(screen.getByTestId('content-no-items')).toBeInTheDocument();
  });

  test('renders PlaylistCard when there are playlists with itemCount > 0', async () => {
    const mockChannelId = 'ABC123';
    (getPlaylist as jest.Mock).mockResolvedValue({
      items: [
        { id: '1', contentDetails: { itemCount: 2 } },
        { id: '2', contentDetails: { itemCount: 0 } },
      ],
    });

    const jsx = await PlaylistPage({ channelId: mockChannelId });
    render(jsx);

    expect(PlaylistCard).toHaveBeenCalledTimes(1);
  });

  it('does not render any playlist when itemCount is 0', async () => {
    const mockChannelId = 'ABC123';
    const mockPlaylists = {
      items: [{ id: '1', contentDetails: { itemCount: 0 } }],
    };
    (getPlaylist as jest.Mock).mockResolvedValue(mockPlaylists);

    const jsx = await PlaylistPage({ channelId: mockChannelId });
    render(jsx);

    expect(PlaylistCard).not.toHaveBeenCalled();
  });
});
