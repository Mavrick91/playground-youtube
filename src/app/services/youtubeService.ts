import { parseISO } from 'date-fns';
import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { SEARCH_PARAMS } from '~/constants/searchParams';
import { arePublishedDatesValid, isValidDate } from '~/lib/utils';
import { VideoListResponseWithChannel, VideoWithChannel } from '~/types/searchVideos';
import { getYouTubeClient } from './oauthService';

export async function getVideoDetailsWithChannels(videoIds?: string[]): Promise<VideoListResponseWithChannel> {
  const youtubeClient = getYouTubeClient();
  const params = !videoIds
    ? {
        chart: 'mostPopular',
        regionCode: 'US',
      }
    : {
        id: videoIds,
      };

  const { data: videosData }: GaxiosResponse<youtube_v3.Schema$VideoListResponse> = await youtubeClient.videos.list({
    part: ['snippet', 'contentDetails', 'statistics'],
    maxResults: 8,
    ...params,
  });

  const channelIds = videosData.items?.map(item => item.snippet?.channelId) as string[];
  const { data: channelResponse }: GaxiosResponse<youtube_v3.Schema$ChannelListResponse> =
    await youtubeClient.channels.list({
      part: ['snippet', 'statistics'],
      id: channelIds,
    });

  const videoWithChannel = videosData.items?.map(item => {
    let newItem = {} as VideoWithChannel;
    const correspondingChannelThumbnail = channelResponse.items?.find(
      channel => channel.id === item.snippet?.channelId
    );
    newItem = {
      ...item,
      channel: correspondingChannelThumbnail!,
    };
    return newItem;
  });

  return {
    ...videosData,
    items: videoWithChannel!,
  };
}

type SearchQuery = {
  [K in (typeof SEARCH_PARAMS)[number]]?: string;
};

const constructSearchQuery = (searchQuery: SearchQuery) => {
  const { q, topicId, videoDuration, order, regionCode, location, radius, publishedAfter, publishedBefore } =
    searchQuery;
  const searchParams: youtube_v3.Params$Resource$Search$List = {
    part: ['snippet'],
    maxResults: 8,
    type: ['video'],
  };

  if (q) searchParams.q = q;
  if (topicId) searchParams.topicId = topicId;
  if (videoDuration) searchParams.videoDuration = videoDuration;
  if (order) {
    searchParams.order = order;
    if (order === 'viewCount') searchParams.type = ['channel'];
  }
  if (regionCode) searchParams.regionCode = regionCode;
  if (location && radius) {
    searchParams.location = location;
    searchParams.locationRadius = `${radius}km`;
    searchParams.type = ['video'];
  }
  if (publishedAfter && publishedBefore && arePublishedDatesValid(publishedAfter, publishedBefore)) {
    if (isValidDate(publishedAfter)) {
      searchParams.publishedAfter = parseISO(publishedAfter).toISOString();
    }
    if (isValidDate(publishedBefore)) {
      searchParams.publishedBefore = parseISO(publishedBefore).toISOString();
    }
  }
  return searchParams;
};

export const getSearchedVideos = async (
  searchQuery: SearchQuery
): Promise<youtube_v3.Schema$SearchListResponse> => {
  const youtubeClient = getYouTubeClient();

  const { data: searchData }: GaxiosResponse<youtube_v3.Schema$SearchListResponse> = await youtubeClient.search.list({
    part: ['snippet'],
    maxResults: 8,
    type: ['video'],
    ...constructSearchQuery(searchQuery),
  });

  return searchData;
};

export async function getCommentThreads(videoId: string, order: 'time' | 'relevance') {
  const youtubeClient = getYouTubeClient();

  const { data: commentThreadsData }: GaxiosResponse<youtube_v3.Schema$CommentThreadListResponse> =
    await youtubeClient.commentThreads.list({
      videoId,
      part: ['snippet'],
      order,
    });

  return commentThreadsData;
}

export async function getCommentReplies(parentCommentId: string) {
  const youtubeClient = getYouTubeClient();

  const { data: commentsData }: GaxiosResponse<youtube_v3.Schema$CommentListResponse> =
    await youtubeClient.comments.list({
      parentId: parentCommentId,
      part: ['snippet'],
    });

  return commentsData;
}
