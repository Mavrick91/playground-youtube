import { formatDistanceToNow, parseISO } from 'date-fns';
import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import Link from 'next/link';
import { getYouTubeClient } from '~/app/services/oauthService';
import { descriptionElements } from '~/lib/string';
import { cn } from '~/lib/utils';
import ClientImage from '../ClientImage';

async function getData(videoId: string) {
  const youtubeClient = getYouTubeClient();

  const { data: commentThreadsData }: GaxiosResponse<youtube_v3.Schema$CommentThreadListResponse> =
    await youtubeClient.commentThreads.list({
      videoId,
      part: ['snippet'],
    });

  return { commentThreadsData };
}

export default async function CommentList({ videoId }: { videoId: string }) {
  const { commentThreadsData } = await getData(videoId);

  return (
    <div className="flex flex-col gap-y-4" data-testid='comment-list'>
      {commentThreadsData?.items?.map(commentThread => {
        const isAuthorChannel =
          commentThread.snippet?.topLevelComment?.snippet?.authorChannelId?.value ===
          commentThread.snippet?.topLevelComment?.snippet?.channelId;
        const comment = commentThread.snippet?.topLevelComment?.snippet;
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
