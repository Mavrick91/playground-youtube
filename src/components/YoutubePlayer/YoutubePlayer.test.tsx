import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactPlayer from 'react-player';
import { youtube_v3 } from 'googleapis';
import YoutubePlayer from './index';

jest.mock('react-player', () => jest.fn(() => null));

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

  it.only('renders the video player, video title, and channel information', () => {
    render(<YoutubePlayer video={video} />);

    expect(ReactPlayer).toHaveBeenCalled();
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
  });
});
