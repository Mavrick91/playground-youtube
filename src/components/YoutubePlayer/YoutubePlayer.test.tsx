import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactPlayer from 'react-player';
import { youtube_v3 } from 'googleapis';
import { usePlaylist } from '~/providers/PlaylistProvider';
import YoutubePlayer from '.';

jest.mock('react-player', () => jest.fn(() => null));
jest.mock('~/providers/PlaylistProvider', () => ({
  usePlaylist: jest.fn(),
}));

describe('YoutubePlayer', () => {
  const video = {
    id: 'test-id',
    snippet: {
      title: 'Test Video Title',
      channelTitle: 'Test Channel Title',
      description: 'Test Description',
      thumbnails: {
        high: {
          url: 'http://example.com/thumbnail.jpg',
          width: 480,
          height: 360,
        },
      },
    },
  } as unknown as youtube_v3.Schema$Video;

  beforeEach(() => {
    (usePlaylist as jest.Mock).mockReturnValue({
      nextVideo: jest.fn(),
    });
  });

  it('renders the video player, video title, and channel information', () => {
    render(<YoutubePlayer video={video} />);

    expect(ReactPlayer).toHaveBeenCalled();
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
  });
});
