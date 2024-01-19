import { youtube_v3 } from 'googleapis';
import { deleteYoutubeSubscription, subscribeYoutubeChannel } from '~/services/channelService';
import { rateYoutubeVideo } from '~/services/videoService';
import ChannelInteractionButtons from './ChannelInteractionButtons';
import ChannelSubscribeButton from './ChannelSubscribeButton';

type Props = {
  video: youtube_v3.Schema$Video;
  channel?: youtube_v3.Schema$Channel;
  videoRating: youtube_v3.Schema$VideoGetRatingResponse;
  videoSubscription: youtube_v3.Schema$SubscriptionListResponse;
};

export default function VideoPlatformChannelHeader({ video, channel, videoRating, videoSubscription }: Props) {
  return (
    <div className="flex justify-between items-center w-full my-3">
      <ChannelSubscribeButton
        video={video}
        channel={channel}
        subscribeYoutubeChannel={subscribeYoutubeChannel}
        deleteYoutubeSubscription={deleteYoutubeSubscription}
        videoSubscription={videoSubscription}
      />
      <ChannelInteractionButtons video={video} rateYoutubeVideo={rateYoutubeVideo} videoRating={videoRating} />
    </div>
  );
}
