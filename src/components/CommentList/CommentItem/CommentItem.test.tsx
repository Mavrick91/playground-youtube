import { fireEvent, render, screen } from '@testing-library/react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { youtube_v3 } from 'googleapis';
import CommentForm from '~/components/CommentForm';
import CommentItem from './index';

jest.mock('~/components/CommentForm', () => jest.fn(() => null));

describe('CommentItem', () => {
  const comment: youtube_v3.Schema$CommentThread = {
    id: '1',
    snippet: {
      topLevelComment: {
        snippet: {
          textOriginal: 'Test comment',
          authorProfileImageUrl: 'http://example.com/image.jpg',
          authorChannelUrl: 'http://www.youtube.com/@user-bc7mm9kz6h',
          authorDisplayName: '@Test_Author',
          publishedAt: '2022-01-01T00:00:00Z',
        },
      },
      totalReplyCount: 2,
    },
  };

  it('renders without crashing', () => {
    render(<CommentItem comment={comment} />);
  });

  it('renders comment details', () => {
    render(<CommentItem comment={comment} />);

    const date = parseISO(comment.snippet?.topLevelComment?.snippet?.publishedAt || '');
    const timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });

    expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByText('@Test_Author')).toBeInTheDocument();
    expect(screen.getByText(timeAgo)).toBeInTheDocument();
  });

  it('toggles reply form when reply button is clicked', async () => {
    render(<CommentItem comment={comment} />);
    fireEvent.click(screen.getByText('Reply'));

    expect(CommentForm).toHaveBeenCalledTimes(1);
  });

  it('renders the link with correct href', () => {
    render(<CommentItem comment={comment} />);
    const linkElement = screen.getByRole('link', { name: /channel/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/channel/Test_Author');
  });

  it('renders the author link and timestamp', () => {
    render(<CommentItem comment={comment} />);

    const authorLink = screen.getByRole('link', { name: '@Test_Author' });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', '/channel/Test_Author');

    const timestamp = screen.getByText('about 2 years ago');
    expect(timestamp).toBeInTheDocument();
  });
});
