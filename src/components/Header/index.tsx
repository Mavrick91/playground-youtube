'use client';

import React from 'react';
import Image from 'next/image';
import { useModal } from '~/providers/ModalProvider';
import Button from '../shared/Button';
import { useUser } from '~/providers/UserProvider';
import { auth, signOut } from '~/services/firebase';

export default function Header() {
  const { openModal, modalState } = useModal();
  const user = useUser();

  const handleClickSignOut = async () => {
    await signOut(auth);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
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
                <button
                  className="text-white underline underline-offset-2 font-medium"
                  onClick={() => openModal('signin')}
                >
                  Login
                </button>
                <Button onClick={() => openModal('signup')} roundedFull>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      {modalState?.isOpen && modalState.modalType()}
    </header>
  );
}
