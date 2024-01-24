import { render, screen, waitFor } from '@testing-library/react';
import { getActivities } from '~/services/activityService';
import { getVideoDetailsWithChannels } from '~/services/videoService';
import VideoItem from '~/components/VideoItem';
import VideoPage from '.';

jest.mock('~/services/activityService');
jest.mock('~/services/videoService');
jest.mock('~/components/VideoItem');

describe('VideoPage', () => {
  beforeEach(() => {
    (getActivities as jest.Mock).mockClear();
    (getVideoDetailsWithChannels as jest.Mock).mockClear();
  });

  const renderComponent = async (props: { channelId: string }) => {
    const jsx = await VideoPage(props);
    render(jsx);
  };

  it('renders ContentNoItems when there are no videos items', async () => {
    (getActivities as jest.Mock).mockResolvedValue({ items: [] });
    (getVideoDetailsWithChannels as jest.Mock).mockResolvedValue({ items: [] });

    await renderComponent({ channelId: 'test' });

    expect(screen.getByTestId('content-no-items')).toBeInTheDocument();
  });

  it('VideoItem is called with correct props', async () => {
    const videoData = {
      id: '123',
      snippet: {
        title: 'Test Video',
        channelTitle: 'Test Channel',
        publishedAt: '2022-01-01T00:00:00Z',
        thumbnails: { medium: { url: 'https://yt3.ggpht.com/4QqI', width: 100, height: 100 } },
      },
      contentDetails: { duration: 'PT1H' },
      statistics: { viewCount: '1000' },
    };

    (getActivities as jest.Mock).mockResolvedValue({
      items: [{ contentDetails: { upload: { videoId: '123' } } }],
    });
    (getVideoDetailsWithChannels as jest.Mock).mockResolvedValue({
      items: [videoData],
    });

    await renderComponent({ channelId: 'test' });

    await waitFor(() =>
      expect(VideoItem).toHaveBeenCalledWith(
        {
          channelThumbnail: null,
          videoTitle: 'Test Video',
          viewCount: '1000',
          publishedAt: '2022-01-01T00:00:00Z',
          thumbnail: {
            url: 'https://yt3.ggpht.com/4QqI',
            width: 100,
            height: 100,
          },
          duration: '01:00:00',
          id: '123',
        },
        expect.anything()
      )
    );
  });
});
