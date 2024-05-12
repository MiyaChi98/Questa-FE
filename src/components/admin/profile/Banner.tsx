import banner from '/public/img/profile/banner.png';
import Card from 'components/card';
import Image from 'next/image';
import { BsUpload } from 'react-icons/bs';
import useApi from 'app/hooks/useApi';

const Banner = (props: { user,setUser,setImgUrl, img: string; name: string; role: string }) => {
 const api =useApi()
  const { user,setUser,setImgUrl,img, name, role } = props;
  const handleFileInput = async (event) => {
    console.log(event.target.files)
    const file = event.target.files[0];
    console.log(file);
    const res = await api.post(
      `quiz/upload/file`,
      {
        file: file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(res);
    try {
      let data = user;
      console.log(data)
      data['img'] = res.data.data.s3Name;
      console.log(data['img'])
      setImgUrl(res.data.data.fileUrl)
      setUser(data);
    } catch (error) {
      console.log(error);
    }
    event.target.value = '';
  };
  return (
    <Card extra={'items-center w-full h-full px-[16px] bg-cover'} bgColor={''}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-fit w-full flex-col items-center justify-center rounded-xl bg-white bg-cover p-3"
        // style={{ backgroundImage: `url(${banner.src})` }}
      >
        <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <Image
            width="2"
            height="20"
            className="h-full w-full rounded-full"
            src={img}
            alt=""
          />
          <div className="absolute bottom-0 flex w-full items-center justify-center bg-white/60">
            <label className="w-fit rounded-lg px-1 pt-1 text-navy-700 hover:bg-indigo-600 hover:text-white">
              <BsUpload />
              <input
                name="profile_img"
                onChange={async (e) => {
                  handleFileInput(e);
                }}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
              />
            </label>{' '}
          </div>
        </div>

        {/* Name and position */}
        <div className="mb-2 mt-1 flex flex-col items-center">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {name}
          </h4>
          <h5 className="text-base font-normal text-navy-700">
            {role.toUpperCase()}
          </h5>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
