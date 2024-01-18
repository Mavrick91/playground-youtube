import { render } from '@testing-library/react';
import * as OrderCommentsProviderModule from '~/providers/OrderCommentsProvider';
import CommentItem from '~/components/CommentList/CommentItem';
import CommentAnswers from '~/components/CommentList/CommentAnswers';
import CommentList from '.';

jest.mock('~/providers/OrderCommentsProvider');
jest.mock('~/components/CommentList/CommentItem/index.tsx', () => jest.fn(() => null));
jest.mock('~/components/CommentList/CommentAnswers/index.tsx', () => jest.fn(() => null));

describe('CommentList', () => {
  it('renders without crashing', () => {
    const mockData = {
      items: [
        {
          id: '1',
          snippet: {
            topLevelComment: {
              snippet: {
                textOriginal: 'Test comment 1',
                authorProfileImageUrl: 'http://example.com/image1.jpg',
                authorChannelUrl: 'http://example.com/channel1',
                authorDisplayName: 'Test Author 1',
                publishedAt: '2022-01-01T00:00:00Z',
              },
            },
            totalReplyCount: 2,
          },
        },
        {
          id: '2',
          snippet: {
            topLevelComment: {
              snippet: {
                textOriginal: 'Test comment 2',
                authorProfileImageUrl: 'http://example.com/image2.jpg',
                authorChannelUrl: 'http://example.com/channel2',
                authorDisplayName: 'Test Author 2',
                publishedAt: '2022-01-02T00:00:00Z',
              },
            },
            totalReplyCount: 0,
          },
        },
      ],
    };

    const useOrderCommentsMock = jest.fn().mockReturnValue({
      data: mockData,
      isFetching: false,
    });

    jest.spyOn(OrderCommentsProviderModule, 'useOrderComments').mockImplementation(useOrderCommentsMock);

    render(<CommentList />);

    expect(useOrderCommentsMock).toHaveBeenCalled();
    expect(CommentItem).toHaveBeenCalledTimes(2);
    expect(CommentAnswers).toHaveBeenCalledTimes(1);
  });

  it('renders a loader when data is being fetched', () => {
    const useOrderCommentsMock = jest.fn().mockReturnValue({
      data: null,
      isFetching: true,
    });

    jest.spyOn(OrderCommentsProviderModule, 'useOrderComments').mockImplementation(useOrderCommentsMock);

    const { getByTestId } = render(<CommentList />);

    expect(useOrderCommentsMock).toHaveBeenCalled();
    expect(getByTestId('loader-puff')).toBeInTheDocument();
  });
});
