import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getActivityByChannel } from '~/services/activityService';
import VideoItem from '~/components/VideoItem';
import { getVideoDetailsWithChannels } from '~/services/videoService';
import { parseISO8601Duration } from '~/lib/utils';

type Props = {
  channelId: string;
};

async function VideoPage({ channelId }: Props) {
  const channelActivities = await getActivityByChannel({
    channelId,
    maxResults: 20,
  });
  const videoIds = channelActivities.items
    ?.map(item => item.contentDetails?.upload?.videoId)
    .filter(Boolean) as string[];
  const videosWithStatistics = await getVideoDetailsWithChannels(videoIds);

  return (
    <MaxWidthWrapper className="mb-32">
      <div className="grid grid-cols-12 gap-y-11 gap-x-4 mt-11">
        {videosWithStatistics.items?.map(video => (
          <div key={video.id} className="col-span-3">
            <VideoItem
              videoTitle={video.snippet?.title}
              channelTitle={video.snippet?.channelTitle}
              duration={parseISO8601Duration(video.contentDetails?.duration || '')}
              publishedAt={video.snippet?.publishedAt}
              thumbnail={video.snippet?.thumbnails?.medium}
              channelThumbnail={null}
              viewCount={video.statistics?.viewCount}
              id={video.id}
            />
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

export default VideoPage;
