import { fireEvent, render, screen, waitFor } from '~/test-utils';
import { youtube_v3 } from 'googleapis';
import ChannelSubscribeButton from '.';

const video: youtube_v3.Schema$Video = {
  id: 'test_video_id',
  snippet: {
    channelId: 'test_channel_id',
    channelTitle: 'Test Channel',
    description: 'This is a test video',
    title: 'Test Video',
  },
};

const channel: youtube_v3.Schema$Channel = {
  id: 'test_channel_id',
  snippet: {
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
  },
};

const subscribeYoutubeChannel = jest.fn();
const deleteYoutubeSubscription = jest.fn();

describe('ChannelSubscribeButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
      <ChannelSubscribeButton
        video={video}
        channel={channel}
        videoSubscription={{ items: [] }}
        subscribeYoutubeChannel={subscribeYoutubeChannel}
        deleteYoutubeSubscription={deleteYoutubeSubscription}
      />
    );

    const img = screen.getByRole('img', { name: /channel/i });
    expect(img.getAttribute('src')).toContain(encodeURIComponent(mockChannel.snippet.thumbnails.high.url));

    expect(screen.getByText(mockVideo.snippet.channelTitle)).toBeInTheDocument();
    expect(screen.getByText(/1.0 K.*/)).toBeInTheDocument();
  });

  it('handles subscribe correctly', async () => {
    const videoSubscription: youtube_v3.Schema$SubscriptionListResponse = {
      items: [],
    };

    render(
      <ChannelSubscribeButton
        video={video}
        channel={channel}
        videoSubscription={videoSubscription}
        subscribeYoutubeChannel={subscribeYoutubeChannel}
        deleteYoutubeSubscription={deleteYoutubeSubscription}
      />
    );

    fireEvent.click(screen.getByText('Subscribe'));
    await waitFor(() => expect(subscribeYoutubeChannel).toHaveBeenCalledWith(video.snippet!.channelId));
  });

  it('handles unsubscribe correctly', async () => {
    const videoSubscription: youtube_v3.Schema$SubscriptionListResponse = {
      items: [
        {
          id: 'test_subscription_id',
          snippet: {
            channelId: 'test_channel_id',
            title: 'Test Subscription',
          },
        },
      ],
    };

    const { user } = render(
      <ChannelSubscribeButton
        video={video}
        channel={channel}
        videoSubscription={videoSubscription}
        subscribeYoutubeChannel={subscribeYoutubeChannel}
        deleteYoutubeSubscription={deleteYoutubeSubscription}
      />
    );

    const button = screen.getByRole('button', { name: /Subscribed/i });

    await user.click(button);

    const unsubscribeButton = screen.getByText(/Unsubscribe/i);
    fireEvent.click(unsubscribeButton);

    await waitFor(() => expect(deleteYoutubeSubscription).toHaveBeenCalledWith(videoSubscription.items![0].id!));
  });
});
