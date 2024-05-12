import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ClassAssist',
};

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full items-center justify-center bg-background-100/60">
      <div className="xl:w-[480px] md:w-96 sm:w-80 flex place-items-center place-contents-center items-center justify-center">
        <div className={inter.className}>{children}</div>
      </div>
    </div>
  );
}
