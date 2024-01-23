import { render, screen } from '@testing-library/react';
import { youtube_v3 } from 'googleapis';
import { formatNumber } from '~/lib/utils';
import ChannelInfo from '.';

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

test('renders channel info correctly', () => {
  render(<ChannelInfo channel={channel} videoSubscription={videoSubscription} />);

  expect(screen.getByText('Test Channel')).toBeInTheDocument();
  expect(screen.getByText('test_channel_url')).toBeInTheDocument();
  expect(screen.getByText(/1.0 K Subscriber/)).toBeInTheDocument();
  expect(screen.getByText(`${formatNumber('100')} videos`)).toBeInTheDocument();
  expect(screen.getByText('This is a test channel')).toBeInTheDocument();

  const channelImage = screen.getByAltText('channel banner') as HTMLImageElement;
  expect(channelImage.src).toContain(encodeURIComponent('http://test.com'));
});
