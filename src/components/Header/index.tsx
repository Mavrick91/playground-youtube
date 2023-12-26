'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '~/providers/UserProvider';
import Button, { buttonVariants } from '../shared/Button';

export default function Header() {
  const user = useUser();

  const handleClickSignOut = async () => {};

  const initiateGoogleAuth = () => {
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope = 'https://www.googleapis.com/auth/userinfo.profile';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&access_type=offline`;

    window.location.href = url;
  };

  return (
    <header>
      <nav className="bg-gray-500 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
              width={50}
              height={50}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              VidVenture
            </span>
          </a>
          <div className="flex items-center gap-4 lg:order-2">
            {user ? (
              <Button onClick={handleClickSignOut}>Logout</Button>
            ) : (
              <>
                <Link href="/auth/google" className={buttonVariants()}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
