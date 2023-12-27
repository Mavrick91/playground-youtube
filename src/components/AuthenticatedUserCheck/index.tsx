'use client';

import React from 'react';
import { useUser } from '~/providers/UserProvider';

export default function AuthenticatedUserCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  return <div>{user ? children : null}</div>;
}
