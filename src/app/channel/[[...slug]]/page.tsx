import { CHANNEL_TABS } from '~/constants/channel_tabs';
import { FC, ReactElement, Suspense } from 'react';
import PlaylistPage from '~/components/TabComponents/Playlist';
import PlaylistLoading from '~/components/TabComponents/Playlist/loading';
import VideoPage from '~/components/TabComponents/Videos';
import VideoLoading from '~/components/TabComponents/Videos/loading';

type Props = {
  params: {
    slug: string[];
  };
};

type ComponentMap = {
  [key: string]: FC<{ channelId: string }>;
};

function wrapInSuspense(component: ReactElement, fallback: ReactElement): ReactElement {
  return <Suspense fallback={fallback}>{component}</Suspense>;
}

const TAB_COMPONENTS: ComponentMap = {
  videos: (props: { channelId: string }) => wrapInSuspense(<VideoPage {...props} />, <VideoLoading />),
  playlist: (props: { channelId: string }) => wrapInSuspense(<PlaylistPage {...props} />, <PlaylistLoading />),
};

const isValidTab = (tabId: string): boolean => CHANNEL_TABS.some(tab => tab.id === tabId);

export default function ChannelPage({ params }: Props) {
  const [channelId, tabId] = params.slug;

  if (!isValidTab(tabId) || !tabId) {
    const DefaultPageComponent = TAB_COMPONENTS.videos;

    return <DefaultPageComponent channelId={channelId} />;
  }

  const PageComponent = TAB_COMPONENTS[tabId];

  if (PageComponent) {
    return <PageComponent channelId={channelId} />;
  }

  return null;
}
