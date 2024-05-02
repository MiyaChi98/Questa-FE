'use client';
import InputField from 'components/fields/InputField'
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
  courseId?: string;
  display: boolean;
  setFormdisplay;
}) {
  const { type, display, courseId , setFormdisplay} = props;
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const api = useApi();
  const [defaultValue, setDefaultValue] = useState({
    courseName: '',
    courseDescription: '',
    grade: '',
    _id: '',
  });
  const isUpdate = type === 'update';
  async function handleUpdate() {
    const res = await api.get(`course/${courseId}`);
    console.log(courseId, res);
    if (res.status == 200) {
      setDefaultValue(res.data.data.course);
      return res.data.data.course;
    }
    return;
  }

  const onSubmit = async (data) => {
    console.log(data);
    console.log('on submit');
    if (isUpdate) {
      console.log('update');
      console.log(data);
      const res = await api.patch(`course/${courseId}`, {
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
        const res = await api.post('course', {
          courseName: data.courseName,
          courseDescription: data.courseDescription,
          grade: parseInt(data.grade),
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
          setFormdisplay(false)
          reset();
        }
    }
  };
  useEffect(() => {
    reset();
    handleUpdate();
    console.log(defaultValue);
  }, [courseId, display]);

  return (
    <div
      className={`${display ? '' : 'hidden'
        } flex h-full w-full items-center justify-center`}
    >
      <div
        className=" border-slate-600 mb-[8vh] mt-[8vh] flex w-4/12 items-center justify-center rounded-2xl border-white px-16 py-7"
        style={{ backgroundColor: '#fff' }}
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
            <h3 className="justify-end mb-5 text-4xl font-bold uppercase text-navy-700 text-indigo-900">
              {type==='create'? 'Tạo lớp học': 'Sửa thông tin lớp học'}
            </h3>
            {/* <p className="mb-9 ml-1 text-base text-white text-xl">
            Enter all the info 
          </p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <InputField
                extra="mb-3"
                label="Tên*"
                label_color='indigo'
                placeholder="Tên lớp học"
                id="name"
                type="text"
                name="courseName"
                defaultValue={defaultValue.courseName ? defaultValue.courseName : ''}
                require={isUpdate!}
                register={register}
                maxLength={50}
                minLength={6}
                pattern={NameRegex}
              />

              <ErrorMessage errors={errors} name="name" />
              {/* Description */}
              <InputField
                extra="mb-3"
                label="Mô tả*"
                label_color='indigo'
                placeholder="Mô tả"
                id="description"
                type="text"
                name="courseDescription"
                require={isUpdate!}
                defaultValue={defaultValue.courseDescription ? defaultValue.courseDescription : ''}
                register={register}
                maxLength={100}
                minLength={6}
                pattern={NameRegex}
              />
              <ErrorMessage errors={errors} name="email" />
              {/* Grade */}
              <InputField
                extra="mb-3"
                label="Khối*"
                label_color='indigo'
                placeholder="Khối của lớp học"
                require={isUpdate!}
                defaultValue={defaultValue.grade ? defaultValue.grade : ''}
                id="grade"
                type="number"
                name="grade"
                register={register}
                maxLength={2}
                minLength={1}
                pattern={Phone_NumberRegex}
              />
              <ErrorMessage errors={errors} name="phone" />
              <button
                className="linear w-full rounded-xl bg-cyan-300 py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                type="submit"
              >
                Tạo lớp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
