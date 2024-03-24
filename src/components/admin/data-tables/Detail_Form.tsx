'use client';
import InputField from '../../../components/fields/InputField';
import { FieldValues, useForm } from 'react-hook-form';
import { NameRegex } from 'constants/Regex/name.regex';
import { EmailRegex } from 'constants/Regex/email.regex';
import { PasswordRegex } from 'constants/Regex/password.regex';
import { Phone_NumberRegex } from 'constants/Regex/phone-number.regex';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import Radio from 'components/radio';
import useApi from 'app/hooks/useApi';

function Form(props: {
  type: 'create' | 'update';
  userId?: string;
  display: boolean;
  setFormdisplay;
}) {
  const { type, display, userId } = props;
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const api = useApi();
  const [defaultValue, setDefaultValue] = useState({
    email: '',
    name: '',
    phone: '',
    _id: '',
  });
  const isUpdate = type === 'update';
  async function handleUpdate() {
    const res = await api.get(`user/${userId}`);
    console.log(userId, res);
    if (res.status == 200) {
      setDefaultValue(res.data.data);
      // setValue('role',res.data.data.zone[0])
      return res.data.data;
    }
    return;
  }
  // handleUpdate()
  useEffect(() => {
    reset();
    handleUpdate();
    console.log(defaultValue);
  }, [userId, display]);
  const onSubmit = async (data) => {
    console.log(data);
    console.log('on submit');
    if (isUpdate) {
      console.log('update');
      console.log(data);
      const res = await api.patch(`user/${userId}`, {
        ...data,
      });
      if (res.data.data.response) {
        const message =
          res.data.data.response.statusCode +
          ' ' +
          res.data.data.response.message;
        console.log(message);
        toast.error(`Error :  ${message}`);
      } else {
        toast.success('Updated!');
        reset();
      }
      console.log(res);
    } else {
      console.log('create');
      const isConfirm = data.password === data.confirmpassword ? true : false;
      console.log(isConfirm);
      if (isConfirm) {
        const res = await api.post('user', {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          zone: data.zone,
        });
        if (res.data.data.response) {
          const message =
            res.data.data.response.statusCode +
            ' ' +
            res.data.data.response.message;
          console.log(message);
          toast.error(`Error :  ${message}`);
        } else {
          toast.success('Created!');
          reset();
        }
      } else {
        console.log('it reach here');
        toast.error('Confirm password is not matching !');
      }
    }
  };
  return (
    <div
      className={`${display ? '' : 'hidden'
        } flex h-full w-full items-center justify-center`}
    >
      <div
        className=" border-slate-600 mb-[8vh] mt-[8vh] flex w-4/12 items-center justify-center rounded-2xl border-white px-16 py-7"
        style={{ backgroundColor: '#475569' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="relative mb-[3vh] flex h-full w-full items-center justify-center px-2 ">
          <button
            type="button"
            className="absolute top-0 right-2 mt-3 inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm font-semibold text-xl text-cyan-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              props.setFormdisplay(false)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="justify-end mb-5 text-4xl font-bold uppercase text-navy-700 text-white">
              {type}
            </h3>
            {/* <p className="mb-9 ml-1 text-base text-white text-xl">
            Enter all the info 
          </p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <InputField
                variant="auth"
                extra="mb-3"
                label="Name*"
                placeholder="name"
                id="name"
                type="text"
                name="name"
                defaultValue={defaultValue.name ? defaultValue.name : ''}
                require={isUpdate!}
                register={register}
                maxLength={50}
                minLength={6}
                pattern={NameRegex}
              />

              <ErrorMessage errors={errors} name="name" />
              {/* Email */}
              <InputField
                variant="auth"
                extra="mb-3"
                label="Email*"
                placeholder="youremail@gmail.com"
                id="email"
                type="text"
                name="email"
                require={isUpdate!}
                defaultValue={defaultValue.email ? defaultValue.email : ''}
                register={register}
                maxLength={50}
                minLength={6}
                pattern={EmailRegex}
              />
              <ErrorMessage errors={errors} name="email" />
              {/* Phone Number */}
              <InputField
                variant="auth"
                extra="mb-3"
                label="Phone*"
                placeholder="0xxx xxx xxx"
                require={isUpdate!}
                defaultValue={defaultValue.phone ? defaultValue.phone : ''}
                id="phone"
                type="text"
                name="phone"
                register={register}
                maxLength={11}
                minLength={0}
                pattern={Phone_NumberRegex}
              />
              <ErrorMessage errors={errors} name="phone" />
              {/* Password */}
              {isUpdate ? (
                ''
              ) : (
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Password*"
                  placeholder="password"
                  id="password"
                  type="password"
                  name="password"
                  // disabled={isUpdate}
                  register={register}
                  maxLength={50}
                  minLength={6}
                  pattern={PasswordRegex}
                  require={isUpdate!}
                />
              )}
              <ErrorMessage errors={errors} name="password" />
              {isUpdate ? (
                ''
              ) : (
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Confirm Password*"
                  placeholder="confirm password"
                  id="confirm-password"
                  type="password"
                  name="confirmpassword"
                  // disabled={isUpdate}
                  register={register}
                  maxLength={50}
                  minLength={6}
                  pattern={PasswordRegex}
                  require={isUpdate!}
                />
              )}
              <div id="role">
                <label className="ml-1.5 text-sm font-medium text-navy-700 text-white">
                  Role
                </label>
                <div className="mb-2 flex h-20 w-full flex-row rounded-xl border bg-white/0 p-2 outline-none">
                  <Radio
                    color="cyan"
                    name="Teacher"
                    type="zone"
                    register={register}
                  />
                  <Radio
                    color="cyan"
                    name="Student"
                    type="zone"
                    register={register}
                  />
                </div>
              </div>
              <div id="gender">
                <label className="ml-1.5 text-sm font-medium text-navy-700 text-white">
                  Gender
                </label>
                <div className="mb-2 flex h-20 w-full flex-row rounded-xl border bg-white/0 p-2 outline-none">
                  <Radio
                    color="indigo"
                    name="Man"
                    type="gender"
                    register={register}
                  />
                  <Radio
                    color="indigo"
                    name="Woman"
                    type="gender"
                    register={register}
                  />
                </div>
              </div>
              <button
                className="linear w-full rounded-xl bg-cyan-300 py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                type="submit"
              >
                Comfirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
