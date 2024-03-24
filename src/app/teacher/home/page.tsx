'use client';

import SidebarCard from 'components/sidebar/components/SidebarCard';
import { MdAssignmentAdd, MdClass, MdContactSupport, MdLibraryBooks, MdPeopleOutline, MdPerson, MdPerson2 } from 'react-icons/md';

const Home = () => {
  return (
    <div className='flex-col gap-40 place-content-center my-20 md-max:gap-10'>
      {/* <p className='text-[26px] font-bold text-white'>Chào mừng bạn đến với Azota 🎉</p>
      <p className='text-[20px] font-bold text-white'>
        Bạn có thể tạo Bài tập, Đề thi hoặc Bảng đáp án để học sinh thi online hoặc offline bằng phiếu tô trắc nghiệm.
        <span className='text-[13px]  text-white'>Tìm hiểu thêm</span>
        </p> */}
      
    <div className='w-full h-full flex flex-row gap-28 place-content-center md-max:gap-10'>
      <a href="assignment"><SidebarCard MdIcon={MdAssignmentAdd} name={'Assignment'} /></a>
      <a href="class"><SidebarCard MdIcon={MdClass} name={'Class'} /></a>
      <a href="content"><SidebarCard MdIcon={MdLibraryBooks} name={'Content'} /></a>
      <a href="profile"><SidebarCard MdIcon={MdPerson} name={'Profile'} /></a>
    </div>
    <div className='w-full h-full flex flex-row gap-28 place-content-center md-max:gap-10'>
    <a href="https://www.facebook.com/groups/1090521142220894"><SidebarCard MdIcon={MdPeopleOutline} name={'Community'} /></a>
    <a href="https://www.facebook.com/groups/1090521142220894"><SidebarCard MdIcon={MdContactSupport} name={'Help'} /></a>
  </div>
  </div>
  );
};

export default Home;
