import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getActivities } from '~/services/activityService';
import VideoItem from '~/components/VideoItem';
import { getVideoDetailsWithChannels } from '~/services/videoService';
import { parseISO8601Duration } from '~/lib/utils';
import { youtube_v3 } from 'googleapis';

type Props = {
  channelId: string;
};

function getVideoIdFromItemContentDetails(item: youtube_v3.Schema$Activity) {
  if (item.contentDetails?.upload?.videoId) return item.contentDetails.upload.videoId;
  return item.contentDetails?.playlistItem?.resourceId?.videoId;
}

async function VideoPage({ channelId }: Props) {
  const channelActivities = await getActivities({
    channelId,
    maxResults: 10,
  });

  const videoIds = Array.from(
    new Set(channelActivities.items?.map(getVideoIdFromItemContentDetails).filter(Boolean))
  ) as string[];

  const videosWithStatistics = await getVideoDetailsWithChannels(videoIds);

  return (
    <MaxWidthWrapper className="mb-32">
      <div className="grid grid-cols-12 gap-y-11 gap-x-4 mt-11">
        {videosWithStatistics.items?.map(video => (
          <div key={video.id} className="col-span-3">
            <VideoItem
              videoTitle={video.snippet?.title}
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
