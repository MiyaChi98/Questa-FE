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
      <div className="flex h-full w-full">
        <Sidebar
          routes={teacher}
          open={open}
          setOpen={setOpen}
          variant="teacher"
        />
        {/* Navbar & Main Content */}
        <div className="h-full w-full font-dm">
          {/* Main Content */}
          <main
            className={`flex-none transition-all
              md:pr-2 xl:ml-[323px]`}
          >
            {/* Routes */}
            <div>
              <Navbar
                onOpenSidenav={() => setOpen(!open)}
                brandText={getActiveRoute(teacher, pathname)}
                secondary={getActiveNavbar(teacher, pathname)}
              />
              <div className="mx-auto h-full p-2 !pt-[10px] md:p-2">
                {children}
              </div>
              {/* <div className="fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white p-4 shadow dark:border-gray-600 ">
                <Footer />
              </div> */}
            </div>
          </main>
        </div>
      </div>
  );
}
