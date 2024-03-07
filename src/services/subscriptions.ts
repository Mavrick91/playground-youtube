'use server';

import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { getYouTubeClient } from './oauthService';

export const getSubscriptionList = async (params?: youtube_v3.Params$Resource$Subscriptions$List) => {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$SubscriptionListResponse> = await youtubeClient.subscriptions.list({
    part: ['snippet', 'contentDetails'],
    maxResults: 8,
    ...params,
  });
  return response.data;
};
