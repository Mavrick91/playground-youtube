import ContainerVideoItems from '~/components/shared/ContainerVideoItems';
import { hasSearchQueryOrFilters } from '~/lib/url-utils';
import { getSearchedVideos, getVideoDetailsWithChannels } from '~/services/videoService';
import { VideoListResponseWithChannel } from '~/types/searchVideos';

async function getData(searchParams: Record<string, string>): Promise<VideoListResponseWithChannel> {
  let responseData: VideoListResponseWithChannel | null = null;

  if (hasSearchQueryOrFilters(searchParams)) {
    const searchData = await getSearchedVideos(searchParams);
    const videoIds = searchData.items?.map(item => item.id?.videoId) as string[];

    responseData = await getVideoDetailsWithChannels(videoIds);
  } else {
    responseData = await getVideoDetailsWithChannels();
  }

  if (responseData === null) throw new Error('Failed to fetch data');

  return responseData;
}

export default async function VideoSearchAndTrending({ searchParams }: { searchParams: Record<string, string> }) {
  const data = await getData(searchParams);

  return <ContainerVideoItems data={data} />;
}
