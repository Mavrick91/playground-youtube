'use server';

import { parseISO } from 'date-fns';
import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { arePublishedDatesValid, isValidDate } from '~/lib/utils';
import { VideoListResponseWithChannel } from '~/types/searchVideos';
import { mapVideosToChannels } from '~/utils/format-video';
import { getChannelDetails } from './channelService';
import { getYouTubeClient } from './oauthService';

export async function getVideosDetails(params?: youtube_v3.Params$Resource$Videos$List) {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$VideoListResponse> = await youtubeClient.videos.list({
    part: ['snippet', 'contentDetails', 'statistics'],
    maxResults: 8,
    ...params,
  });
  return response.data;
}

export async function getVideoDetailsWithChannels(videoIds?: string[]): Promise<VideoListResponseWithChannel> {
  const params = !videoIds ? { chart: 'mostPopular', regionCode: 'US' } : { id: videoIds };
  const videosData = await getVideosDetails(params);

  if (!videosData.items?.length) {
    throw new Error('Unable to retrieve video data.');
  }

  const channelIds = videosData.items?.map(item => item.snippet?.channelId) as string[];
  if (!channelIds.length) {
    throw new Error('Unable to retrieve channel IDs from video data.');
  }

  const channelsData = await getChannelDetails({ id: channelIds });

  const videoWithChannel = mapVideosToChannels(videosData, channelsData) || [];

  return {
    ...videosData,
    items: videoWithChannel,
  };
}

const constructSearchQuery = ({
  q,
  topicId,
  videoDuration,
  order,
  regionCode,
  location,
  locationRadius,
  publishedAfter,
  publishedBefore,
  ...rest
}: youtube_v3.Params$Resource$Search$List) => {
  const hasValidPublishedDates =
    publishedAfter && publishedBefore && arePublishedDatesValid(publishedAfter, publishedBefore);

  return {
    part: ['snippet'],
    maxResults: 8,
    type: order === 'viewCount' ? ['channel'] : ['video'],
    q,
    topicId,
    videoDuration,
    order,
    regionCode,
    ...(location && locationRadius && { location, locationRadius: `${locationRadius}km` }),
    ...(hasValidPublishedDates && {
      publishedAfter: isValidDate(publishedAfter) ? parseISO(publishedAfter).toISOString() : undefined,
      publishedBefore: isValidDate(publishedBefore) ? parseISO(publishedBefore).toISOString() : undefined,
    }),
    ...rest,
  };
};

export const getSearchedVideos = async (
  searchQuery: youtube_v3.Params$Resource$Search$List
): Promise<youtube_v3.Schema$SearchListResponse> => {
  const youtubeClient = await getYouTubeClient();

  const { data: searchData }: GaxiosResponse<youtube_v3.Schema$SearchListResponse> = await youtubeClient.search.list(
    constructSearchQuery(searchQuery)
  );

  return searchData;
};

export async function getCommentThreads(videoId: string, order: 'time' | 'relevance') {
  const youtubeClient = await getYouTubeClient();

  const { data: commentThreadsData }: GaxiosResponse<youtube_v3.Schema$CommentThreadListResponse> =
    await youtubeClient.commentThreads.list({
      videoId,
      part: ['snippet'],
      order,
    });

  return commentThreadsData;
}

export async function getCommentReplies(parentCommentId: string) {
  const youtubeClient = await getYouTubeClient();

  const { data: commentsData }: GaxiosResponse<youtube_v3.Schema$CommentListResponse> =
    await youtubeClient.comments.list({
      parentId: parentCommentId,
      part: ['snippet'],
    });

  return commentsData;
}

export async function rateYoutubeVideo(videoId: string, rating: 'like' | 'dislike' | 'none') {
  const youtubeClient = await getYouTubeClient();

  await youtubeClient.videos.rate({
    id: videoId,
    rating,
  });

  return null;
}

export const getVideoRating = async (videoId: string) => {
  const youtubeClient = await getYouTubeClient();

  const { data: videoRating }: GaxiosResponse<youtube_v3.Schema$VideoGetRatingResponse> =
    await youtubeClient.videos.getRating({
      id: [videoId],
    });

  return videoRating;
};
