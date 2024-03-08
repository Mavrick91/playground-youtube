import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getChannelDetails, getVideoSubscriptionStatus } from '~/services/channelService';
import { ReactNode } from 'react';
import ChannelBanner from '../_components/ChannelBanner';
import ChannelInfo from '../_components/ChannelInfo';
import Tabs, { TabIds } from '../_components/Tabs';

export default async function ChannelLayout({ children, params }: { children: ReactNode; params: { slug: string[] } }) {
  const [channelId, tabId] = params.slug;

  const channelDetails = await getChannelDetails({
    id: [channelId],
    part: ['snippet', 'contentDetails', 'statistics', 'brandingSettings'],
  });
  const channel = channelDetails.items?.[0];

  if (!channel) throw new Error('Channel not found');

  const videoSubscription = await getVideoSubscriptionStatus(channel!.id!);

  return (
    <section className="mb-52">
      <div className="overflow-auto h-screen">
        <MaxWidthWrapper>
          <ChannelBanner url={channel?.brandingSettings?.image?.bannerExternalUrl} />
          <ChannelInfo channel={channel} videoSubscription={videoSubscription} />
        </MaxWidthWrapper>
        <Tabs channelId={channel?.id} activeTab={(tabId || 'videos') as TabIds} />
        {children}
      </div>
    </section>
  );
}
