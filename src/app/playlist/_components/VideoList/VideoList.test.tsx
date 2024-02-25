import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import VideoList from './index';

describe('VideoList', () => {
  const mockVideos = [
    {
      id: '1',
      snippet: {
        title: 'Video 1',
        thumbnails: {
          high: {
            url: 'http://example.com/video1.jpg',
          },
        },
      },
    },
    {
      id: '2',
      snippet: {
        title: 'Video 2',
        thumbnails: {
          high: {
            url: 'http://example.com/video2.jpg',
          },
        },
      },
    },
  ];

  const handleUpdateChoice = jest.fn();

  it('renders without crashing', () => {
    render(<VideoList videos={mockVideos} handleUpdateChoice={handleUpdateChoice} selectedChoice="liked" />);
    expect(screen.getByText('Video 1')).toBeInTheDocument();
    expect(screen.getByText('Video 2')).toBeInTheDocument();
  });

  it('updates choice when liked button is clicked', () => {
    render(<VideoList videos={mockVideos} handleUpdateChoice={handleUpdateChoice} selectedChoice="liked" />);
    fireEvent.click(screen.getByText('Liked'));
    expect(handleUpdateChoice).toHaveBeenCalledWith('liked');
  });

  it('updates choice when disliked button is clicked', () => {
    render(<VideoList videos={mockVideos} handleUpdateChoice={handleUpdateChoice} selectedChoice="liked" />);
    fireEvent.click(screen.getByText('Disliked'));
    expect(handleUpdateChoice).toHaveBeenCalledWith('disliked');
  });
});
