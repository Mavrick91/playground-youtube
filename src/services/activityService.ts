'use server';

import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { getYouTubeClient } from './oauthService';

export async function getActivityByChannel(params: youtube_v3.Params$Resource$Activities$List) {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$ActivityListResponse> = await youtubeClient.activities.list({
    part: ['contentDetails'],
    ...params,
  });
  return response.data;
}
