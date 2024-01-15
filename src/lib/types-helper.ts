import { YouTubeSearchListResponse, YouTubeSearchResult } from '~/types/search';
import { YoutubeVideo, YoutubeVideoResponse } from '~/types/videos';

export function isYoutubeVideo(data: YouTubeSearchResult | YoutubeVideo): data is YoutubeVideo {
  return data && data.kind === 'youtube#video';
}

export function isYouTubeSearchVideo(data: YouTubeSearchResult | YoutubeVideo): data is YouTubeSearchResult {
  return data && data.kind === 'youtube#searchResult';
}
