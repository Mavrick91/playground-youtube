import { youtube_v3 } from 'googleapis';
import Link from 'next/link';
import { formatNumber } from '~/lib/utils';
import { deleteYoutubeSubscription, subscribeYoutubeChannel } from '~/services/channelService';
import { rateYoutubeVideo } from '~/services/videoService';
import ClientImage from '../ClientImage';
import ChannelInteractionButtons from './ChannelInteractionButtons';
import ChannelSubscribeButton from '../shared/ChannelSubscribeButton';

type Props = {
  video: youtube_v3.Schema$Video;
  channel?: youtube_v3.Schema$Channel;
  videoRating: youtube_v3.Schema$VideoGetRatingResponse;
  videoSubscription: youtube_v3.Schema$SubscriptionListResponse;
};

export default function VideoPlatformChannelHeader({ video, channel, videoRating, videoSubscription }: Props) {
  return (
    <div className="flex justify-between items-center w-full my-3">
      <div>
        <div className="flex items-center gap-2">
          <Link href={`/channel/${video?.snippet?.channelId}`}>
            <ClientImage
              src={channel?.snippet?.thumbnails?.high?.url || ''}
              alt="channel"
              className="rounded-full"
              width={36}
              height={36}
              quality={100}
            />
          </Link>
          <div className="flex items-center">
            <div className="flex flex-col mr-6">
              <Link href={`/channel/${video?.snippet?.channelId}`}>
                <span className="text-black font-bold">{video?.snippet?.channelTitle}</span>
              </Link>
              <span className="text-xs text-gray-700 font-medium">
                {formatNumber(channel?.statistics?.subscriberCount || '')} subscribers
              </span>
            </div>
            <ChannelSubscribeButton
              channelId={video?.snippet?.channelId}
              subscribeYoutubeChannel={subscribeYoutubeChannel}
              deleteYoutubeSubscription={deleteYoutubeSubscription}
              videoSubscription={videoSubscription}
            />
          </div>
        </div>
      </div>

      <ChannelInteractionButtons video={video} rateYoutubeVideo={rateYoutubeVideo} videoRating={videoRating} />
    </div>
  );
}
