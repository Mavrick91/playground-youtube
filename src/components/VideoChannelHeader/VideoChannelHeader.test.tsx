import { render, screen } from '@testing-library/react';
import ChannelInteractionButtons from './ChannelInteractionButtons';
import ChannelSubscribeButton from '../shared/ChannelSubscribeButton';
import VideoPlatformChannelHeader from './index';

jest.mock('../shared/ChannelSubscribeButton', () => jest.fn(() => null));
jest.mock('./ChannelInteractionButtons', () => jest.fn(() => null));

describe('VideoPlatformChannelHeader', () => {
  it('renders the ChannelSubscribeButton and ChannelInteractionButtons components', () => {
    const mockVideo = {}; // replace with a mock video object
    const mockChannel = {
      snippet: {
        thumbnails: {
          high: {
            url: 'http://test.com',
          },
        },
      },
      statistics: {
        subscriberCount: '1000',
      },
    };

    render(
      <VideoPlatformChannelHeader
        video={mockVideo}
        channel={mockChannel}
        videoRating={{ items: [] }}
        videoSubscription={{ items: [] }}
      />
    );

    expect(ChannelSubscribeButton).toHaveBeenCalled();
    expect(ChannelInteractionButtons).toHaveBeenCalled();
  });

  it('renders correct links', () => {
    const mockVideo = {
      snippet: {
        channelId: 'test_channel_id',
        channelTitle: 'Test Channel',
      },
    }; // replace with a mock video object
    const mockChannel = {
      snippet: {
        thumbnails: {
          high: {
            url: 'http://test.com',
          },
        },
      },
      statistics: {
        subscriberCount: '1000',
      },
    };

    render(
      <VideoPlatformChannelHeader
        video={mockVideo}
        channel={mockChannel}
        videoSubscription={{ items: [] }}
        videoRating={{ items: [] }}
      />
    );

    const channelLink = screen.getByRole('link', { name: mockVideo.snippet?.channelTitle as string });
    expect(channelLink).toHaveAttribute('href', `/channel/${mockVideo.snippet?.channelId}`);

    const channelImageLink = screen.getByRole('link', { name: 'channel' });
    expect(channelImageLink).toHaveAttribute('href', `/channel/${mockVideo.snippet?.channelId}`);
  });

  it('renders the channel image, channel title, and subscriber count', () => {
    const mockVideo = {
      snippet: {
        channelTitle: 'Test Channel',
      },
    };
    const mockChannel = {
      snippet: {
        thumbnails: {
          high: {
            url: 'http://test.com',
          },
        },
      },
      statistics: {
        subscriberCount: '1000',
      },
    };

    render(
      <VideoPlatformChannelHeader
        video={mockVideo}
        channel={mockChannel}
        videoSubscription={{ items: [] }}
        videoRating={{ items: [] }}
      />
    );

    const img = screen.getByRole('img', { name: /channel/i });
    expect(img.getAttribute('src')).toContain(encodeURIComponent(mockChannel.snippet.thumbnails.high.url));

    expect(screen.getByText(mockVideo.snippet.channelTitle)).toBeInTheDocument();
    expect(screen.getByText(/1.0 K.*/)).toBeInTheDocument();
  });
});
