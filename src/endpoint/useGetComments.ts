import { useQuery } from '@tanstack/react-query';
import { youtube_v3 } from 'googleapis';
import { fetchData } from '~/lib/fetcher';

export const useGetComments = (
  videoId: string,
  order: string,
  initialData: youtube_v3.Schema$CommentThreadListResponse
) =>
  useQuery({
    queryKey: ['comments', videoId, order],
    queryFn: async () =>
      fetchData<youtube_v3.Schema$CommentThreadListResponse>(`/api/youtube/comments`, {
        videoId,
        order,
      }),
    initialData,
    enabled: false,
  });
