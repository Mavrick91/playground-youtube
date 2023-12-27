import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoItem from './index';
import { YoutubeVideo } from '~/types/videos';
import moment from 'moment';

describe('VideoItem', () => {
  const video = {
    snippet: {
      title: 'Test Video',
      thumbnails: {
        high: {
          url: 'http://example.com/test.jpg',
          width: 480,
          height: 360,
        },
      },
      publishedAt: new Date().toISOString(),
    },
    channel: {
      snippet: {
        title: 'Test Channel',
        thumbnails: {
          default: {
            url: 'http://example.com/test.jpg',
          },
        },
      },
    },
    statistics: {
      viewCount: '1000',
    },
  };

  it('renders without crashing', () => {
    render(<VideoItem video={video as YoutubeVideo} />);
    expect(screen.getAllByRole('img').length).toEqual(2);
  });

  it('displays the correct video title', () => {
    render(<VideoItem video={video as YoutubeVideo} />);
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('displays the correct channel title', () => {
    render(<VideoItem video={video as YoutubeVideo} />);
    expect(screen.getByText('Test Channel')).toBeInTheDocument();
  });

  it('displays the correct view count and published date', () => {
    render(<VideoItem video={video as YoutubeVideo} />);

    const expectedDate = moment(video.snippet.publishedAt).fromNow();
    const dateRegex = new RegExp(expectedDate, 'i');

    expect(screen.getByText(/1.0 K views/i)).toBeInTheDocument();
    expect(screen.getByText(dateRegex)).toBeInTheDocument();
  });
});
