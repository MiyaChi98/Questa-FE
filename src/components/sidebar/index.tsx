/* eslint-disable */
import Links from './components/Links';
import logo from '/public/logo.png';
import { IRoute } from 'types/navigation';
import Image from 'next/image';

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      {/* <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span> */}

      <div className={`mt-4 flex items-center justify-center `}>
        <Image
          width="2"
          height="20"
          className="h-20 w-60 rounded-md bg-blue-400"
          src={logo}
          alt=""
        />
        <hr className="h-0.5 bg-gray-700" />{' '}
      </div>
      <div className="mb-7 bg-gray-300 dark:bg-white/30" />
      {/* <hr className='h-0.5 bg-gray-700'/> */}
      {/* Nav item */}
      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>
      {/* Nav item end */}
    </div>
  );
}

export default SidebarHorizon;
