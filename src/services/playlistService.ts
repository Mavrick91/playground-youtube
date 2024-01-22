import { getYouTubeClient } from '~/services/oauthService';
import { youtube_v3 } from 'googleapis';
import { GaxiosResponse } from 'gaxios';

export const getPlaylistByChannel = async (channelId: string) => {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$PlaylistListResponse> = await youtubeClient.playlists.list({
    part: ['snippet', 'contentDetails'],
    channelId,
    maxResults: 12,
  });

  return response.data;
};

export const getPlaylistItems = async (playlistId: string) => {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$PlaylistItemListResponse> = await youtubeClient.playlistItems.list({
    part: ['contentDetails'],
    playlistId,
  });

  return response.data;
};
