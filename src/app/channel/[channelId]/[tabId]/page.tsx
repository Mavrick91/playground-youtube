import { CHANNEL_TABS } from '~/constants/channe_tabs';
import { Suspense } from 'react';
import FeaturedPage from '~/components/TabComponents/Featured';
import PlaylistPage from '~/components/TabComponents/Playlist';
import PlaylistLoading from '~/components/TabComponents/Playlist/loading';
import VideoPage from '~/components/TabComponents/Videos';

type Props = {
  params: {
    channelId: string;
    tabId: string;
  };
};

export default function Page({ params }: Props) {
  const { tabId, channelId } = params;

  if (!CHANNEL_TABS.find(tab => tab.id === params.tabId)) {
    throw new Error('Tab not found');
  }
  return (
    <div>
      {tabId === 'featured' ? <FeaturedPage channelId={channelId} /> : null}
      {tabId === 'videos' ? <VideoPage channelId={channelId} /> : null}
      {tabId === 'playlist' ? (
        <Suspense fallback={<PlaylistLoading />}>
          <PlaylistPage channelId={channelId} />
        </Suspense>
      ) : null}
    </div>
  );
}
