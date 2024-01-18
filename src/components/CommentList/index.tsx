'use client';

import { formatDistanceToNow, parseISO } from 'date-fns';
import Link from 'next/link';
import { descriptionElements } from '~/lib/string';
import { cn } from '~/lib/utils';
import { useOrderComments } from '~/providers/OrderCommentsProvider';
import ClientImage from '../ClientImage';
import Loading from '../shared/Loading';

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
        const isAuthorChannel =
          item.snippet?.topLevelComment?.snippet?.authorChannelId?.value ===
          item.snippet?.topLevelComment?.snippet?.channelId;
        const comment = item.snippet?.topLevelComment?.snippet;
        const date = parseISO(comment?.publishedAt || '');
        const timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });

        return (
          <div key={comment?.textOriginal} className="flex gap-1 items-start mb-4">
            <Link href={`channel/${comment?.authorChannelUrl}`} className="shrink-0">
              <ClientImage
                src={comment?.authorProfileImageUrl || ''}
                alt="channel"
                className="rounded-full"
                width={40}
                height={40}
                quality={100}
              />
            </Link>
            <div className="flex flex-col ml-4">
              <div className="flex items-center gap-1 mb-1">
                <Link
                  href={`channel/${comment?.authorChannelUrl}`}
                  className={cn('text-black text-xs font-bold', {
                    'text-white bg-gray-400 p-1 px-1.5 rounded-full': isAuthorChannel,
                  })}
                >
                  {comment?.authorDisplayName}
                </Link>
                <span className="text-gray-800 text-xs">{timeAgo}</span>
              </div>
              <div className="text-gray-700 text-sm font-medium">
                {descriptionElements(comment?.textOriginal || '')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
