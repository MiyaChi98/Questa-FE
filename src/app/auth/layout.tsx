import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Questa',
};

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full place-items-center place-contents-center justify-center">
      <div className="w-4/12 justify-items-center">
        <div className={inter.className}>{children}</div>
      </div>
    </div>
  );
}
