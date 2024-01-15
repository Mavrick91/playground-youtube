import React from 'react';
import { render, screen } from '@testing-library/react';
import { formatNumber } from '~/lib/utils';
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
    channel: {
      snippet: {
        title: 'Test Channel Title',
        thumbnails: {
          high: {
            url: 'http://example.com/channelThumbnail.jpg',
            width: 480,
            height: 360,
          },
        },
      },
      statistics: {
        subscriberCount: '1234',
      },
    },
  } as unknown as youtube_v3.Schema$Video;
  const channel = {
    snippet: {
      title: 'Test Channel Title',
      thumbnails: {
        high: {
          url: 'http://example.com/channelThumbnail.jpg',
          width: 480,
          height: 360,
        },
      },
    },
    statistics: {
      subscriberCount: '1234',
    },
  } as unknown as youtube_v3.Schema$Channel;

  it.only('renders the video player, video title, and channel information', () => {
    render(<YoutubePlayer video={video} channel={channel} />);

    expect(ReactPlayer).toHaveBeenCalled();
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
    expect(screen.getByText('Test Channel Title')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(formatNumber('1234')))).toBeInTheDocument();
  });
});
