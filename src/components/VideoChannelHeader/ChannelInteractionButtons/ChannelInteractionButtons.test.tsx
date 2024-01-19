import React from 'react';
import { render, screen } from '@testing-library/react';
import ChannelInteractionButtons from './index';

describe('ChannelInteractionButtons', () => {
  it('renders the like button and dislike button', () => {
    const mockVideo = {
      statistics: {
        likeCount: '1000',
      },
    };

    render(<ChannelInteractionButtons video={mockVideo} />);

    const likeButton = screen.getByRole('button', { name: 'Like' });
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveTextContent('1.0 K');

    const dislikeButton = screen.getByRole('button', { name: 'Dislike' });
    expect(dislikeButton).toBeInTheDocument();
  });
});
