'use client';
import InputField from '../../../components/fields/InputField';
import { FcGoogle } from 'react-icons/fc';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { NameRegex } from 'constants/Regex/name.regex';
import { EmailRegex } from 'constants/Regex/email.regex';
import { PasswordRegex } from 'constants/Regex/password.regex';
import { Phone_NumberRegex } from 'constants/Regex/phone-number.regex';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import instance from 'config/axios.config';
import { useState } from 'react';
import useApi from 'app/hooks/useApi';
import RegisterOtpInput from 'components/teacher/RegisterOtpInput';
import { useRouter } from 'next/router';

function SignInDefault() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  // const { push } = useRouter();
  const api = useApi();
  const [otpInput, setOtpInput] = useState(false);
  const data = watch()
  const preSubmit = async ()=>{
    data.email? null: toast.error('Hãy nhập trường email')
    data.password === data.confirm_password ? setOtpInput(true): toast.error('Nhập lại mật khẩu không khớp')
    await handleSignUP()
  }
  const onSubmit = async (data) => {
    setOtpInput(false)
    try {
      const res = await instance.post(
        `auth/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          zone: data.role
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return toast.success(`Đăng kí thành công`);
      // push('/sign-in')
    } catch(error) {
      return toast.error(error.response.data.detail.message);
    }
  };
  const handleSignUP = async () => {
    const res = await api.post('mail/register/sendOTP', {
      email: data.email,
    });
    if(res.status === 201)
    {
      setOtpInput(true)
    }
    else toast.error('email ko tồn tại');
    console.log(res);
  };
  return (
    <div
    className="flex w-full items-center justify-center rounded-2xl bg-white border border-2 px-16 py-7"
    >
      <div
        id={otpInput ? 'overlay' : ''}
        onClick={() => {
          setOtpInput(false);
        }}
      >
        <RegisterOtpInput
          display={otpInput}
          setOtpInput={setOtpInput}
          email={data.email}
          resetpassword={''} 
          onSubmit={onSubmit}   
          data = {data}     />
      </div>
      <div className="mb-[3vh] flex h-full w-full items-center justify-center">
        {/* Sign in section */}
        <div className="w-full flex-col items-center">
          <h3 className="mb-2.5 text-4xl font-bold text-indigo-900">
            Sign Up 
          </h3>
          <div className="mb-6 flex items-center">
            <div className="h-px w-full bg-gray-500 dark:!bg-navy-700" />
            <div className="h-px w-full bg-gray-500 dark:!bg-navy-700" />
          </div>
          <form onSubmit={handleSubmit(preSubmit)}>
            {/* Name */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              label_color='indigo'
              placeholder="Tên"
              id="name"
              type="text"
              name="name"
              register={register}
              maxLength={50}
              minLength={6}
              pattern={NameRegex} require={true}            />

            <ErrorMessage errors={errors} name="name" />
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              label_color='indigo'
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              name="email"
              register={register}
              maxLength={50}
              minLength={6}
              pattern={EmailRegex} require={true}            />
            <ErrorMessage errors={errors} name="email" />
            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              label_color='indigo'
              placeholder="Ít nhất 6 kí tự"
              id="password"
              type="password"
              name="password"
              register={register}
              maxLength={50}
              minLength={6}
              pattern={PasswordRegex} require={true}            />
            <ErrorMessage errors={errors} name="password" />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Confirm password*"
              label_color='indigo'
              placeholder="Nhập lại mật khẩu"
              id="confirm_password"
              type="password"
              name="confirm_password"
              register={register}
              maxLength={50}
              minLength={6}
              pattern={PasswordRegex} require={true}            />
            <ErrorMessage errors={errors} name="password" />
            {/* Phone Number */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Phone*"
              label_color='indigo'
              placeholder="Số điện thoại"
              id="phone"
              type="text"
              name="phone"
              register={register}
              maxLength={11}
              minLength={0}
              pattern={Phone_NumberRegex} require={true}            />
            <ErrorMessage errors={errors} name="phone" />
            <label
        className={`text-indigo-900 ml-1.5 font-medium`}
      >
        Chức vụ*
      </label>
            <Controller
                control={control}
                name="role"
                render={({ field: { onChange } }) => (
                  <select
                    id="role"
                    onChange={onChange}
                    className="mb-3 mt-1 w-full appearance-none rounded-xl border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600"
                  >
                    <option value="">Chọn chức vụ của bạn </option>
                    <option 
                    value={'teacher'}
                    className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Giáo viên
                    </option>
                    <option 
                    value={'student'}
                    className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Học sinh
                    </option>
                  </select>
                )}
              />
            <div className="mb-2 flex items-center">
          </div>
            <button
              className="linear w-full rounded-xl bg-cyan-300 py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4">
            <span className="text-indigo-900 text-sm font-medium">
              Already have a account ?
            </span>
            <a
              href="/auth/sign-in"
              className="ml-1 text-sm font-bold text-cyan-300 hover:text-brand-600"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInDefault;
