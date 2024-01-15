export const API = {
  YOUTUBE: {
    VIDEOS: {
      LIST: '/api/youtube/videos',
    },
    SEARCH: {
      LIST: '/api/youtube/search',
    },
    TRENDING: { 
        LIST: '/api/youtube/trending',
        },
    CHANNELS: {
      LIST: '/api/youtube/channels',
    },
    PLAYLISTS: {
      LIST: '/api/youtube/playlists',
    },
    COMMENTS: {
      LIST: '/api/youtube/comments',
    },
    VIDEO_CATEGORIES: {
      LIST: '/api/youtube/videoCategories',
    },
    SUBSCRIPTIONS: {
      LIST: '/api/youtube/subscriptions',
    },
    CHANNEL_SECTIONS: {
      LIST: '/api/youtube/channelSections',
    },
    CAPTIONS: {
      LIST: '/api/youtube/captions',
    },
    I18N_REGIONS: {
      LIST: '/api/youtube/i18nRegions',
    },
  },
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    STATUS: '/api/auth/status',
  },
  GOOGLE: {
    ME: '/api/google/me',
  },
};
