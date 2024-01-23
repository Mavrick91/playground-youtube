import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import PlaylistVideoHeader, { ButtonType } from '.';

describe('PlaylistVideoHeader function', () => {
  let defaultProps: {
    playlistTitle: string;
    channelTitle: string;
    videosCount: number;
  };

  beforeEach(() => {
    defaultProps = {
      playlistTitle: 'Your Favorite songs',
      channelTitle: 'Channel name',
      videosCount: 10,
    };
  });

  it('should render without crashing', () => {
    render(<PlaylistVideoHeader {...defaultProps} />);
    expect(screen.getByText(defaultProps.playlistTitle)).toBeInTheDocument();
    expect(screen.getByText(`${defaultProps.channelTitle} -`)).toBeInTheDocument();
    expect(screen.getByText(`1/${defaultProps.videosCount}`)).toBeInTheDocument();
  });

  it('should handle button click events', () => {
    render(<PlaylistVideoHeader {...defaultProps} />);

    const shuffleButton = screen.getByLabelText(ButtonType.SHUFFLE);
    fireEvent.click(shuffleButton);
    let svgElement = shuffleButton.querySelector('svg');
    expect(svgElement).toHaveAttribute('stroke-width', '2.5');

    const repeatButton = screen.getByLabelText(ButtonType.REPEAT);
    fireEvent.click(repeatButton);
    svgElement = repeatButton.querySelector('svg');
    expect(svgElement).toHaveAttribute('stroke-width', '2.5');
  });
});
