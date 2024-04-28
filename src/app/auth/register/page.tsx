'use client';
import InputField from '../../../components/fields/InputField';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, useForm } from 'react-hook-form';
import { NameRegex } from 'constants/Regex/name.regex';
import { EmailRegex } from 'constants/Regex/email.regex';
import { PasswordRegex } from 'constants/Regex/password.regex';
import { Phone_NumberRegex } from 'constants/Regex/phone-number.regex';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import instance from 'config/axios.config';

function SignInDefault() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await instance.post(
        `auth/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return toast.success(`Data input is ok , sign in with your new account`);
    } catch {
      return toast.error(`Unknow errors`);
    }
  };

  return (
    <div
      className=" mt-[20vh] flex w-full items-center justify-center rounded-2xl bg-white/90 border-white px-16 py-7"
    >
      <div className="mb-[3vh] flex h-full w-full items-center justify-center px-2 ">
        {/* Sign in section */}
        <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h3 className="mb-2.5 text-4xl font-bold text-indigo-900">
            Sign Up
          </h3>
          <p className="mb-9 ml-1 text-base text-indigo-900">
            Enter your email and password to sign in!
          </p>
          <div
            className="hover:cursor-pointer mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 bg-lightPrimary text-white"
            style={{ backgroundColor: '#67e8f9' }}
          >
            <div className="rounded-full border-white text-xl">
              <FcGoogle />
            </div>
            <p className="text-sm font-medium text-navy-700 text-indigo-900">
              Sign Up with Google
            </p>
          </div>
          <div className="mb-6 flex items-center">
            <div className="h-px w-full bg-gray-500 dark:!bg-navy-700" />
            <div className="h-px w-full bg-gray-500 dark:!bg-navy-700" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              label_color='indigo'
              placeholder="name"
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
              placeholder="password"
              id="password"
              type="password"
              name="password"
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
              placeholder="phone number"
              id="phone"
              type="text"
              name="phone"
              register={register}
              maxLength={11}
              minLength={0}
              pattern={Phone_NumberRegex} require={true}            />
            <ErrorMessage errors={errors} name="phone" />
            <div className="mb-6 flex items-center">
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
