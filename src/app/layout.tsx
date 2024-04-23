import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
} from '@tanstack/react-query';
import AppWrappers from './AppWrappers';
import { getServerSession } from "next-auth"
import { options } from './api/auth/[...nextauth]/options';
const queryClient = new QueryClient();
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Questa',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options)
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AppWrappers session={session}>{children}</AppWrappers>
      </body>
    </html>
  );
}
function renderMathInElement(body: HTMLElement): void {
  throw new Error('Function not implemented.');
}

