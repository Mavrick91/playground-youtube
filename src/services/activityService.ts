'use server';

import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { getVideoDetailsWithChannels } from '~/services/videoService';
import { VideoWithChannel } from '~/types/searchVideos';
import { getYouTubeClient } from './oauthService';

export async function getActivities(params: youtube_v3.Params$Resource$Activities$List) {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$ActivityListResponse> = await youtubeClient.activities.list({
    part: ['contentDetails'],
    ...params,
  });
  return response.data;
}

function getVideoIdFromItemContentDetails(item: youtube_v3.Schema$Activity) {
  if (item.contentDetails?.upload?.videoId) return item.contentDetails.upload.videoId;
  return item.contentDetails?.playlistItem?.resourceId?.videoId;
}

export type GetActivitiesDetailsReturn = {
  nextPageToken?: string | null;
  videoDetails: VideoWithChannel[];
};

export async function getActivitiesDetails(
  params: youtube_v3.Params$Resource$Activities$List
): Promise<GetActivitiesDetailsReturn> {
  const channelActivities = await getActivities({
    maxResults: 50,
    ...params,
  });

  const videoIds = Array.from(
    new Set(channelActivities.items?.map(getVideoIdFromItemContentDetails).filter(Boolean))
  ) as string[];

  const videoDetails = await getVideoDetailsWithChannels(videoIds);

  return {
    nextPageToken: channelActivities.nextPageToken,
    videoDetails: videoDetails.items,
  };
}
