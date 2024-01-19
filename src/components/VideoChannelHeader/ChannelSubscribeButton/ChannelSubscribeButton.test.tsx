import { render, screen } from '@testing-library/react';
import ChannelSubscribeButton from '.';

describe('ChannelSubscribeButton', () => {
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

    render(<ChannelSubscribeButton video={mockVideo} channel={mockChannel} />);

    const img = screen.getByRole('img', { name: /channel/i });
    expect(img.getAttribute('src')).toContain(encodeURIComponent(mockChannel.snippet.thumbnails.high.url));

    expect(screen.getByText(mockVideo.snippet.channelTitle)).toBeInTheDocument();
    expect(screen.getByText(/1.0 K.*/)).toBeInTheDocument();  });
});
