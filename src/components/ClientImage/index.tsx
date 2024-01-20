'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

type Props = {
  className?: string;
} & ImageProps;

export default function ClientImage(props: Props) {
  return <Image {...props} />;
}
