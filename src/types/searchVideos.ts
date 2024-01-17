import { youtube_v3 } from 'googleapis';

export type VideoWithChannel = youtube_v3.Schema$Video & {
  channel: youtube_v3.Schema$Channel | undefined;
};

export interface VideoListResponseWithChannel extends Omit<youtube_v3.Schema$VideoListResponse, 'items'> {
  items: VideoWithChannel[];
};