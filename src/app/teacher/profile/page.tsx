'use client';
import Banner from 'components/admin/profile/Banner';
import General from 'components/admin/profile/General';


const ProfileOverview = () => {
  return (
    <div className=" mt-3 flex w-full flex-col lg:gap-3">
          <Banner />
      <div className="flex w-full flex-col ">
          <General />
        </div>
      </div>
  );
};

export default ProfileOverview;
