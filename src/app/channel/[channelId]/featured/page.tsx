import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { Separator } from '~/components/Separator';
import VideoCarousel from '~/components/VideoCarousel';
import { getSearchedVideos } from '~/services/videoService';

export default async function FeaturedPage({
  params,
}: {
  params: {
    channelId: string;
  };
}) {
  const mostRecentVideos = await getSearchedVideos({
    part: ['snippet'],
    maxResults: 7,
    type: ['video'],
    order: 'date',
    channelId: params.channelId,
  });

  return (
    <MaxWidthWrapper className="mb-32">
      <VideoCarousel videos={mostRecentVideos} title="Recent videos" />
      <Separator className="bg-gray-300 mt-6" />
      <VideoCarousel videos={mostRecentVideos} title="Popular videos" />
      <Separator className="bg-gray-300 mt-6" />
      <VideoCarousel videos={mostRecentVideos} title="Recent videos" />
      <Separator className="bg-gray-300 mt-6" />
      <VideoCarousel videos={mostRecentVideos} title="Recent videos" />
    </MaxWidthWrapper>
  );
}
