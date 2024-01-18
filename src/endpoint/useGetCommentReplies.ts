import { useQuery } from '@tanstack/react-query';
import { youtube_v3 } from 'googleapis';
import { fetchData } from '~/lib/fetcher';

export const useGetCommentReplies = (parentCommentId: string) =>
  useQuery({
    queryKey: ['comment-replies', parentCommentId],
    queryFn: async () =>
      fetchData<youtube_v3.Schema$CommentListResponse>(`/api/youtube/commentReplies`, {
        parentCommentId,
      }),
    enabled: false,
  });
