import { act, fireEvent, render, screen } from '@testing-library/react';
import { usePlaylistControl } from '~/providers/PlaylistControlProvider';
import { usePlaylist } from '~/providers/PlaylistProvider';
import { toast } from 'react-toastify';
import PlaylistVideoHeader, { ButtonType } from './index';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

jest.mock('~/providers/PlaylistControlProvider');
jest.mock('~/providers/PlaylistProvider');

describe('PlaylistVideoHeader function', () => {
  let defaultProps: {
    playlistTitle: string;
    channelTitle: string;
    videosCount: number;
    videoId?: string[];
  };

  const mockSetPlaylist = jest.fn();
  const mockToggleShuffle = jest.fn();
  const mockToggleRepeat = jest.fn();

  beforeEach(() => {
    defaultProps = {
      playlistTitle: 'Your Favorite songs',
      channelTitle: 'Channel name',
      videosCount: 10,
    };

    (usePlaylistControl as jest.Mock).mockReturnValue({
      isShuffling: false,
      toggleShuffle: mockToggleShuffle,
      toggleRepeat: mockToggleRepeat,
      isRepeating: false,
    });

    (usePlaylist as jest.Mock).mockReturnValue({
      setPlaylist: mockSetPlaylist,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<PlaylistVideoHeader {...defaultProps} />);
    expect(screen.getByText(defaultProps.playlistTitle)).toBeInTheDocument();
    expect(screen.getByText(`${defaultProps.channelTitle} -`)).toBeInTheDocument();
    expect(screen.getByText(`1/${defaultProps.videosCount}`)).toBeInTheDocument();
  });

  it('should set the playlist if there are videos ids', async () => {
    await act(async () => render(<PlaylistVideoHeader {...defaultProps} videoIds={['1', '2']} />));

    expect(mockSetPlaylist).toHaveBeenCalledTimes(1);
  });

  it('should not set the playlist if there are no videos ids', async () => {
    await act(async () => render(<PlaylistVideoHeader {...defaultProps} videoIds={[]} />));

    expect(mockSetPlaylist).toHaveBeenCalledTimes(0);
  });

  it('should toggle the shuffle mode', async () => {
    await act(async () => render(<PlaylistVideoHeader {...defaultProps} />));

    const shuffleButton = screen.getByLabelText(ButtonType.SHUFFLE);
    fireEvent.click(shuffleButton);
    expect(mockToggleShuffle).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Shuffle mode activated!', { autoClose: 2000, hideProgressBar: true });
  });

  it('should toggle the repeat mode', async () => {
    await act(async () => render(<PlaylistVideoHeader {...defaultProps} />));

    const repeatButton = screen.getByLabelText(ButtonType.REPEAT);
    fireEvent.click(repeatButton);
    expect(mockToggleRepeat).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Mode loop activated!', { autoClose: 2000, hideProgressBar: true });
  });
});
