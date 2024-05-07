import React from 'react';
import Dropdown from 'components/dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import NavLink from 'components/link/NavLink';
import navbarimage from '/public/img/layout/Navbar.png';
import { BsArrowBarUp } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import Configurator from './Configurator';
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from 'react-icons/io';
import Image from 'next/image';

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText, mini, hovered } = props;
  const [darkmode, setDarkmode] = React
    .useState
    // document.body.classList.contains('dark'),
    ();
  return (
    <nav className="h-24 w-full flex flex-row items-center justify-between bg-white p-2 backdrop-blur-xl">
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full right-0 bg-[url('/public/img/bgimage/bg1.png')]">
      </div>
      <p></p>
      <div className="mr-[6px]">
         <div className="relative mt-[3px] flex h-[61px] items-center justify-end gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 ">
        <Dropdown
          button={
            <Image
              width="2"
              height="20"
              className="h-10 w-10 rounded-full"
              src={'https://thaochi111098.s3.ap-southeast-2.amazonaws.com/Questa.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aDmFwLXNvdXRoZWFzdC0yIkgwRgIhAKW4NL4UTUnQMPp3KT6RbIKoe8KZe3h6pyX0vzcIbmTYAiEA9d8BjXSZ53Ur5sDD%2Bt70xG%2FTuLpOp%2BsssIjOs%2BS9vVYq7QII2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3NjczOTc4MTEzMDkiDNuy9L5tYymGbQ%2B4cirBAp9UpOkI6rdegXZJVAvJ8lwdhMBb3JbIPREQccmP91O22JRNJ%2BC70N80IOE0uHK0HwBomA2JTJJQx8xxWCHtzJCO4J%2FIoiW3%2Bw1Wk78e1GZzxnBeG2ULJf%2FMqNec4LlFLGyOGq3jmbyKregc9JU7MHcM96BhfHOhkV3410sav18YrbLBoiPDscaDTW0Gzo7%2BLFpg629d%2ByteO%2FE%2BwJiB19PF2IXTho2AcPe09AM%2FJkoq3a17yPfPe0XWJB5%2BeSJ%2BH2vlg9xs1kthSTC1ODlPg%2FCyu7dU75xuFiALQreSAc7fQC3IzUgWeLZfz8wXFQ50CtRzLCcMfcXjfmhrKOUym26Mfiwvh2nVqRCXFS8Ys64bmnH4uel1z8xktFkc4kpDdkrJNekTsH9l0Via%2F%2FmtzL9vvozL05NLFxiYST1tni%2Ft3TDT%2B%2BixBjqyAivhCtyBU0Xg%2FkIK%2BGD90b4V92pD2sWxb6AKGLXDnp0y935dZkxd985pFQ37QSOX1F3AkTd%2F2oPqeZ%2BECU3%2FuIVeYPjbSQ44aJEOgkZdQhR8QtNpSqYIJvcT4zTZuw%2Fw0%2FTPLIYAluYK4YBFmHefZigeHoMxpL5Ar2ScuvwF2hQ5FUGyWZf5KQtEfzPdIXdOamlBk95FvjlAZgyOINgzM0dhHq%2F%2Bb12vgcbRedbhzUmNdAx1vhMWpbbZ8ceS1fL%2B8Lg3Q0yTxTeFxyf%2FbFFnFKyQnr18s%2FeASfvi9jZ4GYBY8OihwACJDUNxKpnLxUmI3T%2ByXs3zU%2BgzGMEsCn9w9tQigahh9xn8W%2BRe2JV095O4Q8asG7332iCwGlG1IhLz1eDEoIrQhSfF%2BCrSwc0H7%2BLCTg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240507T152522Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA3FLDZKRW7RE7BKGQ%2F20240507%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=8a105d3ebf14ae41bfc95e1dbd0391d7cdcaca2792ecb46f4bf3263b7d21eba8'}
              alt="Elon Musk"
            />
          }
          classNames={'py-2 top-8'}
        >
          <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="ml-4 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  👋 Hey, Adela
                </p>{' '}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="ml-4 mt-3 flex flex-col">
              <a
                href=" "
                className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Profile Settings
              </a>
              <a
                href=" "
                className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Newsletter Settings
              </a>
              <a
                href=" "
                className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
              >
                Log Out
              </a>
            </div>
          </div>
        </Dropdown>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
