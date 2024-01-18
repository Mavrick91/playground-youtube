import { youtube_v3 } from 'googleapis';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Button from '~/components/shared/Button';

type Props = {
  comment: youtube_v3.Schema$CommentSnippet | undefined;
  toggleReply: () => void;
};

export default function CommentStats({ comment, toggleReply }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2 items-center py-1">
        <ThumbsUp size={16} />
        <span className="text-sm text-gray-700">{comment?.likeCount ? comment?.likeCount : null}</span>{' '}
      </div>
      <div className="flex gap-2 items-center py-1">
        <ThumbsDown size={16} />
      </div>
      <Button type="button" variant="ghost" size="sm" className="hover:rounded-full h-7 text-black" onClick={toggleReply}>
        Reply
      </Button>
    </div>
  );
}
