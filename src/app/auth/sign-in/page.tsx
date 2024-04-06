'use client';
import InputField from '../../../components/fields/InputField';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { EmailRegex } from 'constants/Regex/email.regex';
import { PasswordRegex } from 'constants/Regex/password.regex';
import { Role } from 'constants/Enum/role.enum';

function SignInDefault() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(res)
      if (res?.status != 200) {
        return toast.error('Wrong email or password');
      } else {
        if(session.user.zone[0] === Role.ADMIN){push('/admin');}
        if(session.user.zone[0] === Role.TEACHER){push('/teacher');}
      }
    } catch (error) {
      console.log(error)
      return toast.error('Unknow error');
    }
  };
  return (
    <div
      className="-slate-600 bg-black bg-slate-500 mt-[20vh] flex w-full items-center justify-center rounded-2xl border-white px-16	py-7"
      style={{ backgroundColor: '#475569' }}
    >
      <div className="mb-[3vh] flex h-full w-full items-center justify-center px-2">
        {/* Sign in section */}
        <div className="w-full max-w-full flex-col items-center justify-items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h3 className="mb-2.5 text-4xl font-bold text-white">Sign In</h3>
          <p className="mb-9 ml-1 text-base text-white">
            Enter your email and password to sign in!
          </p>
          <div
            className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl text-white hover:cursor-pointer dark:bg-navy-800"
            style={{ backgroundColor: '#67e8f9' }}
          >
            <div className="rounded-full border-white text-xl">
              <FcGoogle />
            </div>
            <p className="text-sm font-medium text-white">
              Sign In with Google
            </p>
          </div>
          <div className="mb-6 flex items-center">
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              name="email"
              register={register}
              maxLength={20}
              minLength={6}
              pattern={EmailRegex} require={true}            />

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              name="password"
              register={register}
              maxLength={20}
              minLength={6}
              pattern={PasswordRegex} require={true}            />

            <button
              className="linear w-full rounded-xl bg-brand-500 bg-cyan-300 py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4">
            <span className="text-white-700 text-sm font-medium">
              Not registered yet?
            </span>
            <a
              href="/auth/register"
              className="ml-1 text-sm font-bold text-cyan-300 hover:text-brand-600"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInDefault;
