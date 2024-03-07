'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '~/providers/UserProvider';
import { useLogout } from '~/endpoint/useLogout';
import keys from '../../../oauth2.keys.json';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import Button from '../shared/Button';
import MaxWidthWrapper from '../MaxWidthWrapper';
import SearchBar from '../SearchBar';

export default function Header() {
  const { user, setUser } = useUser();
  const { mutate: logout } = useLogout();
  const router = useRouter();

  const handleClickSignOut = async () => {
    logout();
    setUser(null);
  };

  const initiateGoogleAuth = () => {
    const { client_id } = keys.web;
    const redirect_uri = keys.web.redirect_uris[0];

    const scope = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/youtube.force-ssl',
    ].join(' ');

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(
      scope
    )}&access_type=offline&prompt=consent`;
  };

  return (
    <header>
      <nav className="py-2.5 dark:bg-gray-800">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center w-full">
              <a href={process.env.NEXT_PUBLIC_APP_URL} className="flex items-center">
                <Image
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                  width={50}
                  height={50}
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">VidVenture</span>
              </a>

              {user && (
                <div className="ml-10 grow max-w-lg">
                  <SearchBar />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 lg:order-2 shrink">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Image
                      src={user?.snippet?.thumbnails?.default?.url || ''}
                      className="rounded-full cursor-pointer"
                      alt="avatar"
                      quality={100}
                      width={40}
                      height={40}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 absolute top-1 -right-5">
                    <DropdownMenuLabel>{user.snippet?.customUrl}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/channel/${user?.id}/videos`)}>
                      My channel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/playlist')}>Video reactions</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/subscriptions')}>Subscriptions</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleClickSignOut}>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={initiateGoogleAuth}>Login</Button>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
}
