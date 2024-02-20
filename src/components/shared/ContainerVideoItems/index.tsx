import VideoItem from '~/components/VideoItem';
import { parseISO8601Duration } from '~/lib/utils';
import { VideoListResponseWithChannel } from '~/types/searchVideos';

type Props = {
  data: VideoListResponseWithChannel;
};

export default function ContainerVideoItems({ data }: Props) {
  return (
    <div className="grid grid-cols-4 gap-y-10 gap-x-4">
      {data.items?.map(video => {
        if (video.kind === 'youtube#channel') return null;

        return (
          <VideoItem
            key={video.snippet?.title}
            channelThumbnail={video.channel?.snippet?.thumbnails?.high?.url}
            channelTitle={video.snippet?.channelTitle}
            channelId={video.snippet?.channelId}
            publishedAt={video.snippet?.publishedAt}
            thumbnail={video.snippet?.thumbnails?.medium}
            videoTitle={video.snippet?.title || ''}
            viewCount={video.statistics?.viewCount}
            duration={parseISO8601Duration(video.contentDetails?.duration || '')}
            id={video.id}
          />
        );
      })}
    </div>
  );
}
