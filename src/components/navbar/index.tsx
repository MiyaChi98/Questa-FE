import React from 'react';
import avatar from '/public/img/avatars/avatar11.png';
import useApi from 'app/hooks/useApi';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText, mini, hovered } = props;
  const { data: session } = useSession();
  const api = useApi();
  const [user, setUser] = useState(undefined);
  const [imgUrl,setImgUrl] =useState('')
  const userID = session?.user._id;
  const handlePage = async () => {
    console.log(session);
    console.log(userID);
    console.log('handle page');
    const res = await api.get(`user/${userID}`);
    const user = res.data.data
    if(user['img']){
    const file = await api.get(`quiz/file/${user.img}`)
    setImgUrl(file.data.data['fileUrl'])
  }
    setUser(user);
    console.log(res);
  };
  useEffect(() => {
    console.log('use effect');
    handlePage();
  }, []);
  return (
    <nav className="h-[96px] w-full flex flex-row items-center justify-between bg-white p-2 backdrop-blur-xl">
      <div className="ml-[6px]">
        {/* <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {' '}
              /{' '}
            </span>
          </a>
          <NavLink
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </NavLink>
        </div> */}
        {/* <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </NavLink>
        </p> */}
      </div>

      {user?
      <div className="flex flex-row mt-[3px] mx-3 px-5 flex h-[61px] w-fit items-center justify-end gap-2 rounded-full bg-white shadow-xl shadow-shadow-500">
         <div className='flex flex-col items-center justify-center'>
          <span className='text-gray-700 text-[16px]'>{user.name}</span>
          <span className='text-navy-700 font-bold text-[12px]'>{user.zone==='teacher'? 'Giáo viên': 'Học sinh'}</span>
         </div>
         <div className='p-1 bg-gray-100 rounded-full'>
         <Image
              width="2"
              height="20"
              className="h-10 w-10 rounded-full"
              src={imgUrl? imgUrl: avatar}
              alt="Elon Musk"
            />
         </div>
      </div>
      : 
      null
      }
    </nav>
  );
};

export default Navbar;
