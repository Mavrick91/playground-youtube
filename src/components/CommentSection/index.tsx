import { Suspense } from 'react';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import Loading from '../shared/Loading';

type Props = {
  commentCount: string;
  videoId: string;
};

export default function CommentSection({ videoId, commentCount }: Props) {
  const formattedCommentCount = parseInt(commentCount, 10).toLocaleString('fr-FR');

  return (
    <div className="flex flex-col">
      <div className="font-bold text-xl mb-10">{formattedCommentCount} comments</div>
      <CommentForm videoId={videoId} />
      <Suspense
        fallback={
          <Loading
            type="puff"
            size={40}
            color="#000"
          />
        }
      >
        <CommentList videoId={videoId} />
      </Suspense>
    </div>
  );
}
