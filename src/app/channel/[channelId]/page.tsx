import React from 'react';
import ChannelBanner from '~/components/ChannelBanner';
import ChannelInfo from '~/components/ChannelInfo';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getChannelDetails, getVideoSubscriptionStatus } from '~/services/channelService';

export default async function ChannelPage({
  params,
}: {
  params: {
    channelId: string;
  };
}) {
  const channelDetails = await getChannelDetails({
    id: [params.channelId],
    part: ['snippet', 'contentDetails', 'statistics', 'brandingSettings'],
  });
  const channel = channelDetails.items?.[0];
  const videoSubscription = await getVideoSubscriptionStatus(channel!.id!);

  return (
    <div>
      <MaxWidthWrapper>
        <ChannelBanner url={channel?.brandingSettings?.image?.bannerExternalUrl} />
        <ChannelInfo channel={channel} videoSubscription={videoSubscription} />
      </MaxWidthWrapper>
    </div>
  );
}
