import { render } from '@testing-library/react';
import { getPlaylistByChannel } from '~/services/playlistService';
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
    (getPlaylistByChannel as jest.Mock).mockResolvedValue(mockPlaylists);

    const jsx = await PlaylistPage({ channelId: mockChannelId });
    render(jsx);

    expect(PlaylistCard).toHaveBeenCalledTimes(2);
  });
});
