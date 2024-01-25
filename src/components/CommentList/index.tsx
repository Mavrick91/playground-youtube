'use client';

import { useOrderComments } from '~/providers/OrderCommentsProvider';
import { cn } from '~/lib/utils';
import Loading from '../shared/Loading';
import CommentAnswers from './CommentAnswers';
import CommentItem from './CommentItem';

export default function CommentList() {
  const { data, isFetching } = useOrderComments();

  return (
    <div className="frelative" data-testid="comment-list">
      {isFetching && (
        <div className="absolute inset-0">
          <div className="mt-20">
            <Loading type="puff" size={40} />
          </div>
        </div>
      )}
      <div
        className={cn('lex flex-col gap-y-2', {
          'opacity-50': isFetching,
        })}
      >
        {data?.items?.map(item => {
          const parentCommentId = item.id;

          return (
            <div className="flex flex-col mb-2" key={parentCommentId}>
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
    </div>
  );
}
