import { render, screen } from '@testing-library/react';
import ChannelSubscribeButton from '~/components/shared/ChannelSubscribeButton';
import { useUser } from '~/providers/UserProvider';
import SubscriptionCard from '.';

jest.mock('~/providers/UserProvider', () => ({
  useUser: jest.fn().mockReturnValue({
    user: {
      id: '1',
    },
  }),
}));

jest.mock('~/components/shared/ChannelSubscribeButton', () => jest.fn(() => null));

const mockSubscription = {
  id: '1',
  snippet: {
    title: 'Test Title',
    description: 'Test Description',
    resourceId: {
      channelId: '123',
    },
    thumbnails: {
      high: {
        url: 'http://test.com',
      },
    },
  },
};

describe('SubscriptionCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders ClientImage with correct props', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    const img = screen.getByAltText('Test Title');
    const src = decodeURIComponent(img.getAttribute('src') as string);
    expect(src).toContain('http://test.com');
  });

  it('renders Link with correct href prop', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/channel/123');
  });

  it('calls ChannelSubscribeButton with correct props', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);

    expect(ChannelSubscribeButton).toHaveBeenCalledWith(
      expect.objectContaining({
        channelId: mockSubscription.snippet.resourceId.channelId,
        videoSubscription: { items: [mockSubscription] },
      }),
      {}
    );
  });

  it('does not render ChannelSubscribeButton if channel belongs to current user', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { id: '123' },
    });

    render(<SubscriptionCard subscription={mockSubscription} />);

    expect(ChannelSubscribeButton).not.toHaveBeenCalled();
  });

  it('renders title and description correctly', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
