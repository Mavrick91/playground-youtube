'use client';

import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { NavItem } from './NavItem';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const links = [
    {
      href: '/',
      text: 'Home',
      icon: <FaHome size={24} />,
      onClick: () => setIsOpen(false),
    },
    {
      href: '/about',
      text: 'About',
      icon: <IoInformationCircleOutline size={24} />,
      onClick: () => setIsOpen(false),
    },
  ];

  const handleClickBurger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="bg-white border-r p-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:hidden">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={handleClickBurger}
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu size={24} />
        </button>
      </div>
      <aside
        id="default-sidebar"
        ref={ref}
        className={classNames(
          'fixed sm:relative top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen,
          }
        )}
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            {links.map(({ href, text, icon, onClick }, index) => (
              <NavItem
                key={index}
                text={text}
                icon={icon}
                href={href}
                onClick={onClick}
              />
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
