import ChannelBanner from '~/components/ChannelBanner';
import ChannelInfo from '~/components/ChannelInfo';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import Tabs from '~/components/Tabs';
import { getChannelDetails, getVideoSubscriptionStatus } from '~/services/channelService';
import { ReactNode } from 'react';

export default async function ChannelLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { channelId: string };
}) {
  const channelDetails = await getChannelDetails({
    id: [params.channelId],
    part: ['snippet', 'contentDetails', 'statistics', 'brandingSettings'],
  });
  const channel = channelDetails.items?.[0];
  const videoSubscription = await getVideoSubscriptionStatus(channel!.id!);

  return (
    <section className="mb-52">
      <div className="overflow-auto h-screen">
        <MaxWidthWrapper>
          <ChannelBanner url={channel?.brandingSettings?.image?.bannerExternalUrl} />
          <ChannelInfo channel={channel} videoSubscription={videoSubscription} />
        </MaxWidthWrapper>
        <Tabs channelId={channel?.id} />
        {children}
      </div>
    </section>
  );
}
