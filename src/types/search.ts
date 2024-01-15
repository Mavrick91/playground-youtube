export interface YouTubeSearchListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: YouTubeSearchResult[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YouTubeSearchResult {
  kind: string;
  etag: string;
  id: SearchResultId;
  snippet: SearchResultSnippet;
  statistics?: {
    viewCount: string;
  };
  channelThumbnail: string;
}

interface SearchResultId {
  kind: string;
  videoId?: string;
  channelId?: string;
}

interface SearchResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
