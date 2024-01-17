'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

export default function ClientImage(props: ImageProps) {
  return <Image {...props} />;
}
