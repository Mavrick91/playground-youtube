import { ChevronDown } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useGetCommentReplies } from '~/endpoint/useGetCommentReplies';
import { cn } from '~/lib/utils';
import Loading from '~/components/shared/Loading';
import CommentItem from '../CommentItem';

type Props = {
  replyCount?: number | null;
  parentCommentId?: string | null;
};

export default function CommentAnswers({ replyCount, parentCommentId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { refetch, data, isLoading } = useGetCommentReplies(parentCommentId as string);

  const handleClickExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) refetch();
  }, [isExpanded, refetch]);

  return (
    <div>
      <button type="button" onClick={handleClickExpand} className="mb-2">
        <div className="inline-flex items-center gap-1 font-bold text-blue-600 hover:bg-blue-100 p-2 rounded-full">
          <ChevronDown
            strokeWidth={1.5}
            className={cn('transition-transform ', {
              'transform rotate-180': isExpanded,
            })}
          />
          {replyCount} Answers
        </div>
      </button>
      {isLoading && (
        <div className="flex w-full justify-center">
          <Loading type="puff" size={40} />
        </div>
      )}
      {data && isExpanded && (
        <div className="flex flex-col gap-y-2 relative">
          {data.items?.map(item => (
            <CommentItem key={item.id} comment={item} isCommentReply parentCommentId={parentCommentId} />
          ))}
        </div>
      )}
    </div>
  );
}
