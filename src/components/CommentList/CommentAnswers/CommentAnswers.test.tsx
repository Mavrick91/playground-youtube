import { fireEvent, render } from '@testing-library/react';
import { useGetCommentReplies } from '~/endpoint/useGetCommentReplies';
import CommentAnswers from '.';

jest.mock('~/endpoint/useGetCommentReplies');

describe('CommentAnswers', () => {
  beforeEach(() => {
    (useGetCommentReplies as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });

  it('renders without crashing', () => {
    render(<CommentAnswers />);
  });

  it('shows loading when fetching data', () => {
    (useGetCommentReplies as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { getByTestId } = render(<CommentAnswers />);
    expect(getByTestId('loader-puff')).toBeInTheDocument();
  });

  it('renders data when available', () => {
    (useGetCommentReplies as jest.Mock).mockReturnValue({
      isLoading: false,
    });

    const { getByText } = render(<CommentAnswers replyCount={1} />);
    expect(getByText('1 Answers')).toBeInTheDocument();
  });

  it('calls refetch when button is clicked', () => {
    const refetch = jest.fn();

    (useGetCommentReplies as jest.Mock).mockReturnValue({
      refetch,
      data: null,
      isLoading: false,
    });

    const { getByText } = render(<CommentAnswers />);
    fireEvent.click(getByText('Answers'));
    expect(refetch).toHaveBeenNthCalledWith(1);
    fireEvent.click(getByText('Answers'));
    expect(refetch).toHaveBeenNthCalledWith(1);
    fireEvent.click(getByText('Answers'));
    expect(refetch).toHaveBeenNthCalledWith(2);
  });
});
