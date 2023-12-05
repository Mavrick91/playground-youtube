'use client';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  text: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
};
export const NavItem = ({ text, icon, href, onClick }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={classNames(
          'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group',
          {
            'bg-gray-100 dark:bg-gray-700': isActive,
          }
        )}
        onClick={onClick}
      >
        {icon}
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
};
