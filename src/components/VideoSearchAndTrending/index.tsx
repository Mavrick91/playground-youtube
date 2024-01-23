import ContainerVideoItems from '~/components/shared/ContainerVideoItems';
import { hasSearchQueryOrFilters } from '~/lib/url-utils';
import { getSearchedVideos, getVideoDetailsWithChannels } from '~/services/videoService';
import { VideoListResponseWithChannel } from '~/types/searchVideos';

async function fetchSearchedVideosWithChannelDetails(
  searchParams: Record<string, string>
): Promise<VideoListResponseWithChannel> {
  const searchData = await getSearchedVideos(searchParams);
  const videoIds = searchData.items?.map(item => item.id?.videoId) as string[];
  return getVideoDetailsWithChannels(videoIds);
}

async function fetchTrendingVideos(): Promise<VideoListResponseWithChannel> {
  return getVideoDetailsWithChannels();
}

async function getData(searchParams: Record<string, string>): Promise<VideoListResponseWithChannel> {
  if (!hasSearchQueryOrFilters(searchParams)) {
    return fetchTrendingVideos();
  }

  return fetchSearchedVideosWithChannelDetails(searchParams);
}

export default async function VideoSearchAndTrending({ searchParams }: { searchParams: Record<string, string> }) {
  const data = await getData(searchParams);

  if (data === null) throw new Error('Failed to fetch data');

  return <ContainerVideoItems data={data} />;
}
