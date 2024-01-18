'use client';

import { useOrderComments } from '~/providers/OrderCommentsProvider';
import Loading from '../shared/Loading';
import CommentAnswers from './CommentAnswers';
import CommentItem from './CommentItem';

export default function CommentList() {
  const { data, isFetching } = useOrderComments();

  return (
    <div className="flex flex-col gap-y-4 relative" data-testid="comment-list">
      {isFetching && (
        <div className="absolute inset-0 bg-white/50">
          <div className="mt-20">
            <Loading type="puff" size={40} />
          </div>
        </div>
      )}
      {data?.items?.map(item => {
        const parentCommentId = item.id;

        return (
          <div className="flex flex-col" key={parentCommentId}>
            <CommentItem comment={item} parentCommentId={parentCommentId} />

            <div className="text-gray-700 text-sm font-medium ml-16">
              {(item.snippet?.totalReplyCount || 0) >= 1 && (
                <CommentAnswers parentCommentId={parentCommentId} replyCount={item.snippet?.totalReplyCount} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
