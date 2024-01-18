import React from 'react';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-10">
      <div className="overflow-auto h-screen">
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </div>
    </section>
  );
}
