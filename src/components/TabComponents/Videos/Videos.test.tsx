import { render, waitFor } from '@testing-library/react';
import { getActivityByChannel } from '~/services/activityService';
import { getVideoDetailsWithChannels } from '~/services/videoService';
import VideoItem from '~/components/VideoItem';
import VideoPage from '.';

jest.mock('~/services/activityService');
jest.mock('~/services/videoService');
jest.mock('~/components/VideoItem');

describe('VideoPage', () => {
  beforeEach(() => {
    (getActivityByChannel as jest.Mock).mockClear();
    (getVideoDetailsWithChannels as jest.Mock).mockClear();
  });

  const renderComponent = async (props: { channelId: string }) => {
    const jsx = await VideoPage(props);
    render(jsx);
  };

  it('does not render video items when no data is available', async () => {
    (getActivityByChannel as jest.Mock).mockResolvedValue({ items: [] });
    (getVideoDetailsWithChannels as jest.Mock).mockResolvedValue({ items: [] });

    await renderComponent({ channelId: 'test' });
    await waitFor(() => expect(VideoItem).not.toHaveBeenCalled());
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

    (getActivityByChannel as jest.Mock).mockResolvedValue({
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
          channelTitle: 'Test Channel',
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
