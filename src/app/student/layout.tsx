'use client';
// Layout components
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {student} from 'routes';
import {
  getActiveNavbar,
  getActiveRoute,
} from 'utils/navigation';
import React from 'react';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';

export default function Student({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // if (isWindowAvailable()) document.documentElement.dir = 'ltr';
  return (
      <div className="flex h-full w-full bg-background-100">
        <Sidebar
          routes={student}
          open={open}
          setOpen={setOpen}
          variant="student"
        />
        {/* Navbar & Main Content */}
        <div 
        className="w-full h-full font-dm xl:pl-[234px]"
        >
          <main
            className={`flex w-full h-full transition-all`}
          >
            <div 
            className='h-full w-full flex flex-col '>
              <Navbar
                onOpenSidenav={() => setOpen(!open)}
                brandText={getActiveRoute(student, pathname)}
                secondary={getActiveNavbar(student, pathname)}
              />
              <div 
              className="mx-auto h-[100vh-96px] w-full !pt-[10px] md:p-2 overflow-scroll overflow-x-hidden"
              >
                {children}
              </div>

            </div>
          </main>
        </div>
      </div>
  );
}
