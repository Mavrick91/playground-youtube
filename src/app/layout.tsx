import type { Metadata } from 'next';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticatedUserCheck from '~/components/AuthenticatedUserCheck';
import Header from '~/components/Header';
import { cn } from '~/lib/utils';
import { QueryProvider } from '~/providers/QueryProvider';
import { UserProvider } from '~/providers/UserProvider';
import { roboto } from './font';
import './globals.css';

export const metadata: Metadata = {
  title: 'VidVenture',
  description: 'A YouTube clone built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn('relative h-full font-sans antialiased overflow-hidden', roboto.className)}
        style={{
          backgroundImage: `url(/background.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <QueryProvider>
          <UserProvider>
            <div className="flex flex-col">
              <Header />
              <AuthenticatedUserCheck>{children}</AuthenticatedUserCheck>
              <ToastContainer />
            </div>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
