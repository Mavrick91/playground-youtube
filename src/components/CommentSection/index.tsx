'use client';

import { youtube_v3 } from 'googleapis';
import React from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Link from 'next/link';

type Props = {
  commentCount: string;
  commentThreads?: youtube_v3.Schema$CommentThreadListResponse;
};

export default function CommentSection({ commentCount, commentThreads }: Props) {
  const formattedCommentCount = parseInt(commentCount, 10).toLocaleString('fr-FR');

  return (
    <div className="flex flex-col">
      <div className="font-bold text-xl mb-8">{formattedCommentCount} comments</div>

      <div className="flex flex-col gap-y-4">
        {commentThreads?.items?.map(commentThread => {
          const comment = commentThread.snippet?.topLevelComment?.snippet;
          const date = parseISO(comment?.publishedAt || '');
          const timeAgo = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });

          return (
            <div key={comment?.textDisplay} className="flex gap-1 items-start mb-4">
              <Link href={`channel/${comment?.authorChannelUrl}`} className="shrink-0">
                <Image
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
                  <Link href={`channel/${comment?.authorChannelUrl}`} className="text-black text-xs font-bold ">
                    {comment?.authorDisplayName}
                  </Link>
                  <span className="text-gray-800 text-xs">{timeAgo}</span>
                </div>
                <div className="text-gray-700 text-sm font-medium">{parse(comment?.textDisplay || '')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
