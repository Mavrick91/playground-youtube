import { render, screen } from '@testing-library/react';
import { youtube_v3 } from 'googleapis';
import { formatNumber } from '~/lib/utils';
import ChannelSubscribeButton from '~/components/shared/ChannelSubscribeButton';
import { useUser } from '~/providers/UserProvider';
import ChannelInfo from './index';

jest.mock('~/providers/UserProvider', () => ({
  useUser: jest.fn().mockReturnValue({
    user: {
      id: '1',
    },
  }),
}));

jest.mock('~/components/shared/ChannelSubscribeButton', () => jest.fn(() => null));

const channel: youtube_v3.Schema$Channel = {
  id: 'test_channel_id',
  snippet: {
    customUrl: 'test_channel_url',
    title: 'Test Channel',
    description: 'This is a test channel',
    thumbnails: {
      high: {
        url: 'http://test.com',
      },
    },
  },
  statistics: {
    subscriberCount: '1000',
    videoCount: '100',
  },
};

const videoSubscription: youtube_v3.Schema$SubscriptionListResponse = {
  items: [],
};

describe('ChannelSubscribeButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders channel info correctly', () => {
    render(<ChannelInfo channel={channel} videoSubscription={videoSubscription} />);

    expect(screen.getByText('Test Channel')).toBeInTheDocument();
    expect(screen.getByText('test_channel_url')).toBeInTheDocument();
    expect(screen.getByText(/1.0 K Subscriber/)).toBeInTheDocument();
    expect(screen.getByText(`${formatNumber('100')} videos`)).toBeInTheDocument();
    expect(screen.getByText('This is a test channel')).toBeInTheDocument();

    const channelImage = screen.getByAltText('channel banner') as HTMLImageElement;
    expect(channelImage.src).toContain(encodeURIComponent('http://test.com'));
  });

  it('calls ChannelSubscribeButton with correct props', () => {
    render(<ChannelInfo channel={channel} videoSubscription={videoSubscription} />);

    expect(ChannelSubscribeButton).toHaveBeenCalledWith(
      expect.objectContaining({
        channelId: channel.id,
        videoSubscription: { items: videoSubscription.items },
      }),
      {}
    );
  });

  it('does not render ChannelSubscribeButton if channel belongs to current user', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { id: 'test_channel_id' },
    });

    render(<ChannelInfo channel={channel} videoSubscription={videoSubscription} />);

    expect(ChannelSubscribeButton).not.toHaveBeenCalled();
  });
});
