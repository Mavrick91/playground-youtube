export type YoutubeVideo = {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
        standard?: Thumbnail;
        maxres?: Thumbnail;
      };
      channelTitle: string;
      tags?: string[];
      categoryId: string;
      liveBroadcastContent: string;
      localized: {
        title: string;
        description: string;
      };
      defaultAudioLanguage?: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      contentRating: {};
      projection: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
    channel: {
      kind: string;
      etag: string;
      id: string;
      snippet: {
        title: string;
        description: string;
        customUrl: string;
        publishedAt: string;
        thumbnails: {
          default: Thumbnail;
          medium: Thumbnail;
          high: Thumbnail;
        };
        localized: {
          title: string;
          description: string;
        };
        country: string;
      };
      statistics: {
        viewCount: string;
        commentCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
        videoCount: string;
      };
    }
  };
  
  export type Thumbnail = {
    url: string;
    width: number;
    height: number;
  };
  
  export type YoutubeVideoResponse = {
    kind: string;
    etag: string;
    items: YoutubeVideo[];
    nextPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
  };
  