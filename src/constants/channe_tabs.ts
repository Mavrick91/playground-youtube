export enum ChannelTabIds {
  VIDEOS = 'videos',
  PLAYLIST = 'playlist',
}

export interface ChannelTab {
  id: ChannelTabIds;
  title: string;
}

export const CHANNEL_TABS: ChannelTab[] = [
  {
    id: ChannelTabIds.VIDEOS,
    title: 'Videos',
  },
  {
    id: ChannelTabIds.PLAYLIST,
    title: 'Playlist',
  },
];
