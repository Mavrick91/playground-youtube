'use server';

import { getYouTubeClient } from '~/services/oauthService';
import { youtube_v3 } from 'googleapis';
import { GaxiosResponse } from 'gaxios';

const getPlaylistItems = async (params: youtube_v3.Params$Resource$Playlistitems$List) => {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$PlaylistItemListResponse> = await youtubeClient.playlistItems.list({
    part: ['contentDetails'],
    ...params,
  });

  return response.data;
};

type Video = youtube_v3.Schema$PlaylistItem;

export type Playlist = youtube_v3.Schema$Playlist & {
  firstVideo?: Video;
};

export type PlaylistResponse = youtube_v3.Schema$PlaylistListResponse & {
  items: Playlist[];
};

export const getPlaylist = async (params: youtube_v3.Params$Resource$Playlists$List): Promise<PlaylistResponse> => {
  const youtubeClient = await getYouTubeClient();

  const response: GaxiosResponse<youtube_v3.Schema$PlaylistListResponse> = await youtubeClient.playlists.list({
    part: ['snippet', 'contentDetails'],
    maxResults: 50,
    ...params,
  });

  const playlists = response.data.items || [];

  const playlistsWithFirstVideo = await Promise.all(
    playlists.map(async playlist => {
      const playlistItems = await getPlaylistItems({
        playlistId: playlist.id || '',
        maxResults: 1,
        part: ['contentDetails'],
      });

      return {
        ...playlist,
        firstVideo: playlistItems.items?.[0],
      };
    })
  );

  return {
    ...response.data,
    items: playlistsWithFirstVideo,
  };
};
