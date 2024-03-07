export const VIDEO_ORDER_OPTIONS = [
  {
    value: 'date',
    label: 'Date',
    tooltip: 'Sorts newest to oldest based on creation date.',
  },
  {
    value: 'rating',
    label: 'Rating',
    tooltip: 'Orders from highest to lowest ratings.',
  },
  {
    value: 'title',
    label: 'Title',
    tooltip: 'Arranges alphabetically by title.',
  },
  {
    value: 'videoCount',
    label: 'Video Count',
    tooltip: 'Sorts channels by the most uploaded videos.',
  },
  {
    value: 'viewCount',
    label: 'View Count',
    tooltip: 'Orders from most to least views; for live videos, by current viewers.',
  },
];

export const SUBSCRIPTIONS_ORDER_OPTIONS = [
  {
    value: 'alphabetical',
    label: 'Sort by Channel Name (A-Z)',
    tooltip: 'Sorts channels alphabetically.',
  },
  {
    value: 'relevance',
    label: 'Sort by Relevance (Default)',
    tooltip:
      "YouTube's algorithm determines relevance. Use when you want the most important or likely engaging subscriptions to appear first.",
  },
  {
    value: 'unread',
    label: 'Sort by Activity',
    tooltip: 'Places subscribers with new videos or activity at the top. Helps discover new content.',
  },
];
