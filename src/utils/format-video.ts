import { youtube_v3 } from 'googleapis';

export function mapVideosToChannels(
  videosData: youtube_v3.Schema$VideoListResponse,
  channelData: youtube_v3.Schema$ChannelListResponse
) {
  return videosData.items?.map(video => {
    const correspondingChannel = channelData.items?.find(channel => channel.id === video.snippet?.channelId);
    return {
      ...video,
      channel: correspondingChannel!,
    };
  });
}
