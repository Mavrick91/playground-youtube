import { render, screen } from '@testing-library/react';
import CommentSection from '.';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import UpdateOrderComments from '../UpdateOrderComments';

jest.mock('../UpdateOrderComments', () => jest.fn(() => null));
jest.mock('../CommentForm', () => jest.fn(() => null));
jest.mock('../CommentList', () => jest.fn(() => null));

describe('CommentSection', () => {
  test('renders comment count, CommentForm, and CommentList', async () => {
    render(<CommentSection videoId="testVideoId" commentCount="1000" />);

    // Check that the comment count is displayed correctly
    const commentCountElement = screen.getByText('1 000 comments');
    expect(commentCountElement).toBeInTheDocument();

    expect(UpdateOrderComments).toHaveBeenCalled();
    expect(CommentForm).toHaveBeenCalled();
    expect(CommentList).toHaveBeenCalled();
  });
});
