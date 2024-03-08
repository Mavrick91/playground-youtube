import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChannelInteractionButtons from './index';

describe('ChannelInteractionButtons', () => {
  it('renders the like button and dislike button', () => {
    const mockVideo = {
      id: '1',
      statistics: {
        likeCount: '1000',
      },
    };
    const mockRateYoutubeVideo = jest.fn();
    const mockVideoRating = { items: [{ rating: 'none' }] };

    render(
      <ChannelInteractionButtons
        video={mockVideo}
        rateYoutubeVideo={mockRateYoutubeVideo}
        videoRating={mockVideoRating}
      />
    );

    const likeButton = screen.getByRole('button', { name: 'Like' });
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveTextContent('1.0 K');

    const dislikeButton = screen.getByRole('button', { name: 'Dislike' });
    expect(dislikeButton).toBeInTheDocument();
  });

  it('calls rateYoutubeVideo with the correct arguments when the like button is clicked', () => {
    const mockVideo = {
      id: '1',
      statistics: {
        likeCount: '1000',
      },
    };
    const mockRateYoutubeVideo = jest.fn();
    const mockVideoRating = { items: [{ rating: 'none' }] };

    render(
      <ChannelInteractionButtons
        video={mockVideo}
        rateYoutubeVideo={mockRateYoutubeVideo}
        videoRating={mockVideoRating}
      />
    );

    const likeButton = screen.getByRole('button', { name: 'Like' });
    fireEvent.click(likeButton);

    expect(mockRateYoutubeVideo).toHaveBeenCalledWith(mockVideo.id, 'like');
  });

  it('calls rateYoutubeVideo with the correct arguments when the dislike button is clicked', () => {
    const mockVideo = {
      id: '1',
      statistics: {
        likeCount: '1000',
      },
    };
    const mockRateYoutubeVideo = jest.fn();
    const mockVideoRating = { items: [{ rating: 'none' }] };

    render(
      <ChannelInteractionButtons
        video={mockVideo}
        rateYoutubeVideo={mockRateYoutubeVideo}
        videoRating={mockVideoRating}
      />
    );

    const dislikeButton = screen.getByRole('button', { name: 'Dislike' });
    fireEvent.click(dislikeButton);

    expect(mockRateYoutubeVideo).toHaveBeenCalledWith(mockVideo.id, 'dislike');
  });
});
