import React from 'react';
import { youtube_v3 } from 'googleapis';
import { cookies } from 'next/headers';
import ContainerVideoItems from '~/components/shared/ContainerVideoItems';
import { API } from '~/constants/apiUrl';
import { createURL, hasSearchQueryOrFilters } from '~/lib/url-utils';
import { GaxiosResponse } from 'gaxios';
import { ItemWithStatistics } from '~/types/searchVideos';
import data from './data.json';

// const delay = (ms: number) =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => reject({ message: 'Failed to fetch data' }), ms)
//   );

// async function getData(auth_token: string | undefined, searchParams: any) {
//   await delay(4000);

//   return {
//     finish: true,
//   };
// }

// Define constants for the API endpoints

async function getData(
  authToken: string | undefined,
  searchParams: Record<string, string>
): Promise<ItemWithStatistics[]> {
  const options = {
    cache: 'no-cache',
    headers: {
      Cookie: `auth_token=${authToken}`,
    },
  } as RequestInit;

  const endpoint = hasSearchQueryOrFilters(searchParams) ? API.YOUTUBE.SEARCH.LIST : API.YOUTUBE.TRENDING.LIST;
  const newUrl = createURL(endpoint, { q: searchParams.q });
  const res = await fetch(newUrl, options);
  if (!res.ok) throw new Error('HTTP error');

  const responseData:
    | GaxiosResponse<youtube_v3.Schema$SearchListResponse>
    | GaxiosResponse<youtube_v3.Schema$VideoListResponse> = await res.json();

  const videoIds = responseData.data.items
    ?.map(item => (typeof item.id === 'string' ? item.id : item.id?.videoId))
    .filter(id => id) as string[];
  const channelIds = responseData.data.items?.map(item => item.snippet?.channelId).filter(id => id) as string[];

  const videosUrl = createURL(API.YOUTUBE.VIDEOS.LIST, {
    videoIds: videoIds.join(','),
  });

  const channelsUrl = createURL(API.YOUTUBE.CHANNELS.LIST, {
    channelIds: channelIds.join(','),
  });

  const [statsResponseJson, channelResponse]: [
    GaxiosResponse<youtube_v3.Schema$VideoListResponse>,
    GaxiosResponse<youtube_v3.Schema$ChannelListResponse>,
  ] = await Promise.all([
    fetch(videosUrl, options).then(res => res.json()),
    fetch(channelsUrl, options).then(res => res.json()),
  ]);

  const viewCounts: Record<string, string> = {};
  statsResponseJson.data.items?.forEach(item => {
    if (item.id && item.statistics) {
      viewCounts[item.id] = item.statistics.viewCount || '0';
    }
  });

  const channelThumbnails: Record<string, string> = {};
  channelResponse.data.items?.forEach(item => {
    if (item.id && item.snippet?.thumbnails?.default?.url) {
      channelThumbnails[item.id] = item.snippet.thumbnails.default.url;
    }
  });

  return (
    responseData.data.items?.map(item => {
      let newItem: ItemWithStatistics = { ...item };

      const videoId = typeof item.id === 'string' ? item.id : item.id?.videoId;

      if (videoId) {
        newItem = {
          ...newItem,
          statistics: { viewCount: viewCounts[videoId] || '0' },
        };
      }

      if (item.snippet?.channelId && channelThumbnails[item.snippet.channelId]) {
        newItem = {
          ...newItem,
          channelThumbnail: channelThumbnails[item.snippet.channelId],
        };
      }

      return newItem;
    }) || []
  );
}

export default async function SearchedVideos({ searchParams }: { searchParams: Record<string, string> }) {
  const authToken = cookies().get('auth_token')?.value;
  const data = await getData(authToken, searchParams);
  // console.log('🚀 ~ data:', JSON.stringify(data));

  // return <div>Searched videos</div>;
  return <ContainerVideoItems data={data} />;
}
