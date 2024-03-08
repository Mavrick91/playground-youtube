import { render, screen } from '@testing-library/react';
import CommentSection from './index';
import CommentForm from '../../../../components/CommentForm';
import CommentList from '../../../../components/CommentList';
import UpdateOrderComments from '../../../../components/UpdateOrderComments';

jest.mock('../../../../components/UpdateOrderComments', () => jest.fn(() => null));
jest.mock('../../../../components/CommentForm', () => jest.fn(() => null));
jest.mock('../../../../components/CommentList', () => jest.fn(() => null));

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
