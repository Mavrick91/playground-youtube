import { youtube_v3 } from "googleapis";

export interface ItemWithStatistics extends Omit<youtube_v3.Schema$SearchResult, 'id'> {
    id?: youtube_v3.Schema$ResourceId | string | null;
    statistics?: youtube_v3.Schema$VideoStatistics;
    channelThumbnail?: string;
    contentDetails?: youtube_v3.Schema$VideoContentDetails;
  }
  