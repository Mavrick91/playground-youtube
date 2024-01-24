import React from 'react';
import ClientImage from '../ClientImage';

export default function ChannelBanner({ url }: { url?: string | null }) {
  if (!url) return null;

  return (
    <div className="w-[1284px] h-[206px] relative object-fill rounded-xl overflow-hidden">
      <ClientImage
        src={`${url}=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`!}
        alt="channel banner"
        className="w-full"
        fill
      />
    </div>
  );
}
