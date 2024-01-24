import React from 'react';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import PlaylistControlProvider from '~/providers/PlaylistControlProvider';

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-10">
      <div className="overflow-auto h-screen">
        <MaxWidthWrapper>
          <PlaylistControlProvider>{children}</PlaylistControlProvider>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
