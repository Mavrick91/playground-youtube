import { render, screen } from '@testing-library/react';
import YoutubePlayer from './index';
import { YoutubeVideo } from '~/types/videos';
import { formatNumber } from '~/lib/utils';
import ReactPlayer from 'react-player';

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
  } as unknown as YoutubeVideo;

  it('renders the video player, video title, and channel information', () => {
    render(<YoutubePlayer video={video} />);

    expect(ReactPlayer).toHaveBeenCalled();
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
    expect(screen.getByText('Test Channel Title')).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(formatNumber('1234')))
    ).toBeInTheDocument();
  });
});
