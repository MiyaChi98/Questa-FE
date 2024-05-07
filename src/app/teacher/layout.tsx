'use client';
// Layout components
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import {teacher} from 'routes';
import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';
import React from 'react';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';
import Footer from 'components/footer/Footer';

export default function Teacher({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // if (isWindowAvailable()) document.documentElement.dir = 'ltr';
  return (
      <div className="flex h-full w-full bg-background-100">
        <Sidebar
          routes={teacher}
          open={open}
          setOpen={setOpen}
          variant="teacher"
        />
        {/* Navbar & Main Content */}
        <div 
        className="w-full h-full font-dm xl:pl-[220px]"
        >
          <main
            className={`flex w-full h-full transition-all
              `}
          >
            <div 
            className='h-full w-full flex flex-col'>
              <Navbar
                onOpenSidenav={() => setOpen(!open)}
                brandText={getActiveRoute(teacher, pathname)}
                secondary={getActiveNavbar(teacher, pathname)}
              />
              <div 
              className="mx-auto flex-auto w-full p-2 !pt-[10px] md:p-2"
              >
                {children}
              </div>

            </div>
          </main>
        </div>
      </div>
  );
}
