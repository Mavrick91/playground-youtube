import { getYouTubeClient } from '~/services/oauthService';
import { youtube_v3 } from 'googleapis';
import { GaxiosResponse } from 'gaxios';

export const getPlaylist = async (params: youtube_v3.Params$Resource$Playlists$List) => {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$PlaylistListResponse> = await youtubeClient.playlists.list({
    part: ['snippet', 'contentDetails'],
    maxResults: 12,
    ...params,
  });

  return response.data;
};

export const getPlaylistItems = async (params: youtube_v3.Params$Resource$Playlistitems$List) => {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$PlaylistItemListResponse> = await youtubeClient.playlistItems.list({
    part: ['contentDetails'],
    ...params,
  });

  return response.data;
};
