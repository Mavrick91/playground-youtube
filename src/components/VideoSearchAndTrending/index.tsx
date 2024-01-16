import { youtube_v3 } from 'googleapis';
import ContainerVideoItems from '~/components/shared/ContainerVideoItems';
import { API } from '~/constants/apiUrl';
import { fetchAllData, fetchData } from '~/lib/fetcher';
import { hasSearchQueryOrFilters } from '~/lib/url-utils';
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

async function getData(searchParams: Record<string, string>): Promise<ItemWithStatistics[]> {
  const endpoint = hasSearchQueryOrFilters(searchParams) ? API.YOUTUBE.SEARCH.LIST : API.YOUTUBE.TRENDING.LIST;

  const responseData = await fetchData<youtube_v3.Schema$SearchListResponse | youtube_v3.Schema$VideoListResponse>(
    endpoint,
    searchParams
  );

  const videoIds = responseData.items
    ?.map(item => (typeof item.id === 'string' ? item.id : item.id?.videoId))
    .filter(id => id)
    .join(',') as string;
  const channelIds = responseData.items
    ?.map(item => item.snippet?.channelId)
    .filter(id => id)
    .join(',') as string;

  const responses = await fetchAllData([
    { endpoint: API.YOUTUBE.VIDEOS.LIST, params: { videoIds } },
    { endpoint: API.YOUTUBE.CHANNELS.LIST, params: { channelIds } },
  ]);

  const statsResponseJson = responses[0] as youtube_v3.Schema$VideoListResponse;
  const channelResponse = responses[1] as youtube_v3.Schema$ChannelListResponse;

  const videoInfos: Record<string, Record<string, object>> = {};
  statsResponseJson.items?.forEach(item => {
    if (item.id && item.statistics) {
      videoInfos[item.id] = {
        statistics: item.statistics,
        contentDetails: item.contentDetails || {},
      };
    }
  });

  const channelThumbnails: Record<string, string> = {};
  channelResponse.items?.forEach(item => {
    if (item.id && item.snippet?.thumbnails?.default?.url) {
      channelThumbnails[item.id] = item.snippet.thumbnails.default.url;
    }
  });

  return (
    responseData.items?.map(item => {
      const { id, snippet } = item;
      const videoId = typeof id === 'string' ? id : id?.videoId;
      const channelId = snippet?.channelId;

      const newItem = {
        ...item,
        statistics: videoId ? videoInfos[videoId].statistics : undefined,
        channelThumbnail: channelId ? channelThumbnails[channelId] : undefined,
        contentDetails: videoId ? videoInfos[videoId].contentDetails : undefined,
      };

      return newItem;
    }) || []
  );
}

export default async function SearchedVideos({ searchParams }: { searchParams: Record<string, string> }) {
  const data = await getData(searchParams);
  console.log('🚀 ~ data:', JSON.stringify(data));

  // return <div>Searched videos</div>;
  return <ContainerVideoItems data={data} />;
}
