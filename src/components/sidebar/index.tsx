/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import SidebarCard from 'components/sidebar/components/SidebarCard';
import { IRoute } from 'types/navigation';
import { MdExplore } from 'react-icons/md';

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

      <div className={`mx-[56px] mt-[42px] flex items-center`}>
        <div className="ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
           <img 
            src={'https://thaochi111098.s3.ap-southeast-2.amazonaws.com/A%CC%89nh%20chu%CC%A3p%20ma%CC%80n%20hi%CC%80nh%20%28221%29.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aDmFwLXNvdXRoZWFzdC0yIkgwRgIhAKW4NL4UTUnQMPp3KT6RbIKoe8KZe3h6pyX0vzcIbmTYAiEA9d8BjXSZ53Ur5sDD%2Bt70xG%2FTuLpOp%2BsssIjOs%2BS9vVYq7QII2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3NjczOTc4MTEzMDkiDNuy9L5tYymGbQ%2B4cirBAp9UpOkI6rdegXZJVAvJ8lwdhMBb3JbIPREQccmP91O22JRNJ%2BC70N80IOE0uHK0HwBomA2JTJJQx8xxWCHtzJCO4J%2FIoiW3%2Bw1Wk78e1GZzxnBeG2ULJf%2FMqNec4LlFLGyOGq3jmbyKregc9JU7MHcM96BhfHOhkV3410sav18YrbLBoiPDscaDTW0Gzo7%2BLFpg629d%2ByteO%2FE%2BwJiB19PF2IXTho2AcPe09AM%2FJkoq3a17yPfPe0XWJB5%2BeSJ%2BH2vlg9xs1kthSTC1ODlPg%2FCyu7dU75xuFiALQreSAc7fQC3IzUgWeLZfz8wXFQ50CtRzLCcMfcXjfmhrKOUym26Mfiwvh2nVqRCXFS8Ys64bmnH4uel1z8xktFkc4kpDdkrJNekTsH9l0Via%2F%2FmtzL9vvozL05NLFxiYST1tni%2Ft3TDT%2B%2BixBjqyAivhCtyBU0Xg%2FkIK%2BGD90b4V92pD2sWxb6AKGLXDnp0y935dZkxd985pFQ37QSOX1F3AkTd%2F2oPqeZ%2BECU3%2FuIVeYPjbSQ44aJEOgkZdQhR8QtNpSqYIJvcT4zTZuw%2Fw0%2FTPLIYAluYK4YBFmHefZigeHoMxpL5Ar2ScuvwF2hQ5FUGyWZf5KQtEfzPdIXdOamlBk95FvjlAZgyOINgzM0dhHq%2F%2Bb12vgcbRedbhzUmNdAx1vhMWpbbZ8ceS1fL%2B8Lg3Q0yTxTeFxyf%2FbFFnFKyQnr18s%2FeASfvi9jZ4GYBY8OihwACJDUNxKpnLxUmI3T%2ByXs3zU%2BgzGMEsCn9w9tQigahh9xn8W%2BRe2JV095O4Q8asG7332iCwGlG1IhLz1eDEoIrQhSfF%2BCrSwc0H7%2BLCTg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240507T150600Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA3FLDZKRW7RE7BKGQ%2F20240507%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=0092874d09702b83d4e3b28f6e0aa93b58c53223c00e40a6e5e2b2cf3e11615b'}
            className = 'w-20 h-20' 
            />
        </div>
      </div>
      <div className="mb-7 mt-[58px] bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>
      {/* Nav item end */}
    </div>
  );
}

export default SidebarHorizon;
