import { youtube_v3 } from 'googleapis';
import ChannelInteractionButtons from './ChannelInteractionButtons';
import ChannelSubscribeButton from './ChannelSubscribeButton';

type Props = {
  video: youtube_v3.Schema$Video;
  channel?: youtube_v3.Schema$Channel;
};

export default function VideoPlatformChannelHeader({ video, channel }: Props) {
  return (
    <div className="flex justify-between items-center w-full my-3">
      <ChannelSubscribeButton video={video} channel={channel} />
      <ChannelInteractionButtons video={video} />
    </div>
  );
}
