'use client';
import Banner from 'components/admin/profile/Banner';
import General from 'components/admin/profile/General';
import { useSearchParams } from 'next/navigation';
import useApi from 'app/hooks/useApi';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PasswordRegex } from 'constants/Regex/password.regex';
import InputField from 'components/fields/InputField';
import { EmailRegex } from 'constants/Regex/email.regex';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Phone_NumberRegex } from 'constants/Regex/phone-number.regex';
import { NameRegex } from 'constants/Regex/name.regex';
import { toast } from 'react-toastify';
import { NoRuleRegex } from 'constants/Regex/norule.regex';
import RegisterOtpInput from 'components/teacher/RegisterOtpInput';

const ProfileOverview = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const api = useApi();
  const [otpInput, setOtpInput] = useState(false);
  const [user, setUser] = useState(undefined);
  const [imgUrl,setImgUrl] =useState('')
  const userID = session?.user._id;
  const data = watch()
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
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password && data.reset_password){
       resetPassword(data)
    }
    const res = await api.patch(`user/${userID}`,
      {
        name:data.name,
        email:data.email,
        phone:data.phone,
        school:data.school,
        img: data.img
      }
    )
    console.log(res)
    setOtpInput(false)
  };
  const preSubmit = async ()=>{
    data.password && !data.reset_password ? toast.error('Xin hãy nhập mật khẩu mới'): null
    !data.password && data.reset_password ? toast.error('Xin hãy nhập mật khẩu cũ để xác minh'): null
    const newUser = user
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        newUser[key] = data[key];
      }
  }
    setUser(newUser)
    await handleChangeDetail()
  }
  const handleChangeDetail = async () => {
    console.log(user.email)
    const res = await api.post('mail/register/sendOTP', {
      email: user.email,
    });
    if(res.status === 201)
    {
      setOtpInput(true)
    }
    else toast.error('email ko tồn tại');
    console.log(res);
  };
  const resetPassword=async (data)=>{
    const res = await api.post(`user/resetPassword/${userID}`,
      {
        password: data.password,
        reset_password: data.reset_password
      }
    )
    if(res.status === 201){
      toast.success('Đổi mật khẩu thành công')
      setValue('password','')
      setValue('reset_password','')
    }
    else toast.error('Đã có lỗi xảy ra')
  }
  useEffect(() => {
    console.log('use effect');
    handlePage();
  }, []);
  return (
    <div className=" mt-3 flex w-full flex-col gap-5">
      <div
        id={otpInput ? 'overlay' : ''}
        onClick={() => {
          setOtpInput(false);
        }}
      >
       {user && user.email ? ( 
        <RegisterOtpInput
          display={otpInput}
          setOtpInput={setOtpInput}
          email={user.email}
          resetpassword={''} 
          onSubmit={onSubmit}   
          data = {user}     />
       )
       : null}
      </div>
      {user && user.img ? (
        <Banner img={imgUrl} name={user.name} role={user.zone[0]} user={user} setUser={setUser} setImgUrl={setImgUrl}/>
      ) : null}
      <div className="flex w-full flex-col px-10">
        {/* <General /> */}
        {user && user.img ? (
          <form
            className="flex h-full w-full flex-row gap-10"
            onSubmit={handleSubmit(preSubmit)}
          >
            <div className="flex w-1/2 flex-col rounded-xl bg-white p-5">
              {/* Name */}
              <InputField
                variant="auth"
                defaultValue={user.name}
                extra="mb-3"
                label="Name*"
                label_color="indigo"
                placeholder="Tên"
                id="name"
                type="text"
                name="name"
                register={register}
                maxLength={50}
                minLength={6}
                pattern={NameRegex}
                require={true}
              />

              <ErrorMessage errors={errors} name="name" />
              {/* Email */}
              <InputField
                variant="auth"
                defaultValue={user.email}
                extra="mb-3"
                label="Email*"
                label_color="indigo"
                placeholder="mail@simmmple.com"
                id="email"
                type="text"
                name="email"
                register={register}
                maxLength={50}
                minLength={6}
                pattern={EmailRegex}
                require={true}
              />
              <ErrorMessage errors={errors} name="email" />
              {/* Phone Number */}
              <InputField
                variant="auth"
                defaultValue={user.phone}
                extra="mb-3"
                label="Số điện thoại*"
                label_color="indigo"
                placeholder="Số điện thoại"
                id="phone"
                type="text"
                name="phone"
                register={register}
                maxLength={11}
                minLength={0}
                pattern={Phone_NumberRegex}
                require={true}
              />
              <ErrorMessage errors={errors} name="phone" />
              {/* School */}
              <InputField
                variant="auth"
                defaultValue={user.school}
                extra="mb-3"
                label="Tổ chức*"
                label_color="indigo"
                placeholder="Tổ chức"
                id="school"
                type="text"
                name="school"
                register={register}
                maxLength={100}
                minLength={0}
                pattern={NoRuleRegex}
                require={true}
              />
            </div>
            <div className="flex h-fit w-1/2 flex-col items-end gap-5">
              {/* Password */}
              <div className="flex h-fit w-full flex-col rounded-xl bg-white p-5">
              <h1 className="mb-1 text-[26px] font-bold text-navy-700">
                Thay đổi mật khẩu{' '}
              </h1>
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Mật khẩu hiện tại*"
                  label_color="indigo"
                  placeholder=""
                  id="password"
                  type="password"
                  name="password"
                  register={register}
                  maxLength={50}
                  minLength={6}
                  pattern={PasswordRegex}
                  require={false}
                />
                <ErrorMessage errors={errors} name="password" />
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Mật khẩu mới*"
                  label_color="indigo"
                  placeholder=""
                  id="reset_password"
                  type="password"
                  name="reset_password"
                  register={register}
                  maxLength={50}
                  minLength={6}
                  pattern={PasswordRegex}
                  require={false}
                />
              </div>
              <button
                className="w-28 rounded-xl bg-cyan-300 py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                type="submit"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileOverview;
