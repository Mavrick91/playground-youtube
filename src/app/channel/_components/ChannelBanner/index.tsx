import React from 'react';
import ClientImage from '~/components/ClientImage';

export default function ChannelBanner({ url }: { url?: string | null }) {
  if (!url) return null;

  return (
    <div className="h-24 md:h-40 w-full aspect-video lg:h-52 relative object-fill rounded-xl overflow-hidden">
      <ClientImage
        src={`${url}=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`!}
        alt="channel banner"
        className="object-cover"
        fill
      />
    </div>
  );
}
