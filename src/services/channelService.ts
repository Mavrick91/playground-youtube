'use server';

import { GaxiosResponse } from 'gaxios';
import { youtube_v3 } from 'googleapis';
import { getYouTubeClient } from './oauthService';

export async function getChannelDetails(params: youtube_v3.Params$Resource$Channels$List) {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$ChannelListResponse> = await youtubeClient.channels.list({
    part: ['snippet', 'statistics'],
    ...params,
  });
  return response.data;
}

export const subscribeYoutubeChannel = async (channelId: string) => {
  const youtubeClient = await getYouTubeClient();

  await youtubeClient.subscriptions.insert({
    part: ['snippet'],
    requestBody: {
      snippet: {
        resourceId: {
          kind: 'youtube#channel',
          channelId,
        },
      },
    },
  });

  return null;
};

export const deleteYoutubeSubscription = async (subscriptionId: string) => {
  const youtubeClient = await getYouTubeClient();

  await youtubeClient.subscriptions.delete({
    id: subscriptionId,
  });

  return null;
};

export const getVideoSubscriptionStatus = async (channelId: string) => {
  const youtubeClient = await getYouTubeClient();

  const { data: subscriptionStatus }: GaxiosResponse<youtube_v3.Schema$SubscriptionListResponse> =
    await youtubeClient.subscriptions.list({
      part: ['snippet'],
      forChannelId: channelId,
      mine: true,
    });

  return subscriptionStatus;
};
