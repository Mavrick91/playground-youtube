import { formatDistanceToNow, parseISO } from 'date-fns';
import { youtube_v3 } from 'googleapis';
import Link from 'next/link';
import { useState } from 'react';
import ClientImage from '~/components/ClientImage';
import { descriptionElements } from '~/lib/string';
import { cn } from '~/lib/utils';
import CommentForm from '~/components/CommentForm';
import CommentStats from '../CommentStats';

function isCommentThread(
  comment: youtube_v3.Schema$CommentThread | youtube_v3.Schema$Comment
): comment is youtube_v3.Schema$CommentThread {
  return Boolean('snippet' in comment && comment.snippet && 'topLevelComment' in comment.snippet);
}

function isComment(
  comment: youtube_v3.Schema$CommentThread | youtube_v3.Schema$Comment
): comment is youtube_v3.Schema$Comment {
  return Boolean('snippet' in comment && comment.snippet && !('topLevelComment' in comment.snippet));
}

function getCommentDetails(comment: youtube_v3.Schema$CommentThread | youtube_v3.Schema$Comment) {
  let commentSnippet;
  let isAuthorChannel;

  if (isCommentThread(comment)) {
    commentSnippet = comment?.snippet?.topLevelComment?.snippet;
    isAuthorChannel = commentSnippet?.authorChannelId?.value === commentSnippet?.channelId || false;
  } else if (isComment(comment)) {
    commentSnippet = comment?.snippet;
    isAuthorChannel = commentSnippet?.authorChannelId?.value === commentSnippet?.channelId || false;
  }

  return { commentSnippet, isAuthorChannel };
}

type Props = {
  comment?: youtube_v3.Schema$CommentThread | youtube_v3.Schema$Comment;
  isCommentReply?: boolean;
  parentCommentId?: string | null;
};

export default function CommentItem({ comment, isCommentReply, parentCommentId }: Props) {
  const channelThumbnailSize = isCommentReply ? 24 : 40;
  const [showReplyForm, setShowReplyForm] = useState(false);

  const { commentSnippet, isAuthorChannel } = getCommentDetails(comment!);

  const date = parseISO(commentSnippet?.publishedAt || '');
  const timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div key={commentSnippet?.textOriginal} className="flex gap-1 items-start">
      <Link href={`/channel/${commentSnippet?.authorChannelId?.value}`} className="shrink-0">
        <ClientImage
          src={commentSnippet?.authorProfileImageUrl || ''}
          alt="channel"
          className="rounded-full"
          width={channelThumbnailSize}
          height={channelThumbnailSize}
          quality={100}
        />
      </Link>
      <div className="flex flex-col ml-4 w-full">
        <div className="flex items-center gap-1 mb-1">
          <Link
            href={`/channel/${commentSnippet?.authorChannelId?.value}`}
            className={cn('text-black text-[13px] font-bold', {
              'text-white bg-gray-400 p-1 px-1.5 rounded-full': isAuthorChannel,
            })}
          >
            {commentSnippet?.authorDisplayName}
          </Link>
          <span className="text-gray-800 text-xs">{timeAgo}</span>
        </div>
        <div className="text-gray-800 text-sm">{descriptionElements(commentSnippet?.textOriginal || '')}</div>
        <CommentStats comment={commentSnippet} toggleReply={toggleReplyForm} />
        {showReplyForm && (
          <div className="mt-4">
            <CommentForm
              commentId={parentCommentId}
              onCancel={toggleReplyForm}
              size="sm"
              defaultValues={` ${commentSnippet?.authorDisplayName}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
