import { render, screen } from '@testing-library/react';
import { youtube_v3 } from 'googleapis';
import CommentSection from './index';

describe('CommentSection', () => {
  const commentCount = '1000';
  const commentThreads: youtube_v3.Schema$CommentThreadListResponse = {
    items: [
      {
        snippet: {
          topLevelComment: {
            snippet: {
              textOriginal: 'Test comment',
              authorDisplayName: 'Test User',
              authorProfileImageUrl: 'http://example.com/image.jpg',
              authorChannelUrl: 'http://example.com/channel',
              publishedAt: '2022-01-01T00:00:00Z',
            },
          },
        },
      },
    ],
  };

  beforeEach(() => {
    render(<CommentSection commentCount={commentCount} commentThreads={commentThreads} />);
  });

  test('renders comment section', () => {
    const commentElement = screen.getByText(/Test comment/i);
    expect(commentElement).toBeInTheDocument();

    const userElement = screen.getByText(/Test User/i);
    expect(userElement).toBeInTheDocument();

    const timeAgoElement = screen.getByText(/about \d+ years? ago/i);
    expect(timeAgoElement).toBeInTheDocument();
  });

  test('renders comment count', () => {
    const commentCountElement = screen.getByText(/1 000 comments/i);
    expect(commentCountElement).toBeInTheDocument();
  });

  test('renders image and authorDisplayName wrapped in a Link with the correct href', () => {
    const imageLinkElement = screen.getByRole('link', { name: /channel/i });
    expect(imageLinkElement).toBeInTheDocument();
    expect(imageLinkElement.getAttribute('href')).toBe('channel/http://example.com/channel');

    const authorLinkElement = screen.getByRole('link', { name: /Test User/i });
    expect(authorLinkElement).toBeInTheDocument();
    expect(authorLinkElement.getAttribute('href')).toBe('channel/http://example.com/channel');
  });
});
