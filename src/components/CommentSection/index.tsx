import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import UpdateOrderComments from '../UpdateOrderComments';

type Props = {
  commentCount: string;
  videoId: string;
};

export default function CommentSection({ videoId, commentCount }: Props) {
  const formattedCommentCount = parseInt(commentCount, 10).toLocaleString('fr-FR');

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-9 mb-10">
        <div className="font-bold text-xl">{formattedCommentCount} comments</div>
        <UpdateOrderComments />
      </div>
      <CommentForm videoId={videoId} />
      <CommentList />
    </div>
  );
}
