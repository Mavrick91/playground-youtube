import React from 'react';
import Maintenance from '~/components/Maintenance';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';

export default function LoadingVideos() {
  return (
    <MaxWidthWrapper>
      <Maintenance />
    </MaxWidthWrapper>
  );
}
