'use client';

import useApi from 'app/hooks/useApi';
import InputField from 'components/fields/InputField';
import Quiz from 'components/teacher/Quiz';
import { NameRegex } from 'constants/Regex/name.regex';
import { Phone_NumberRegex } from 'constants/Regex/phone-number.regex';
import { useEffect, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { onChange } from 'react-toastify/dist/core/store';

export type Data_Type = {
  name: string;
  course: string;
  end: string;
  quiz: {
    question: string;
    img?: string;
    audio?: string;
    A: string;
    B: string;
    C?: string;
    D?: string;
    answer: 'A' | 'B' | 'C' | 'D';
  }[];
  score: number;
  start: string;
  subject: string;
  time: number;
};
const New_Assignment = () => {
  const api = useApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Data_Type>()
  const [courseArray, setCourseArray] = useState([]);
  const handlePage = async () => {
    const res = await api.get(`course/allcourse`);
    console.log(res.data.data);
    setCourseArray(res.data.data);
  };
  useEffect(() => {
    handlePage();
  }, []);
  return (
    <>
      <form
        className="mt-10 grid h-[83vh] grid-cols-7 gap-4"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="col-span-2 h-full rounded-xl bg-white backdrop-blur-xl">
          <div className="rounded-t-lg bg-brand-700 p-3">
            <div className="text-xl font-bold text-white ">
              Thông tin bài kiểm tra
            </div>
          </div>
          <div className="p-2">
            {/* Assignment Name */}
            <InputField
              extra="mt-3"
              label="Name*"
              label_color="indigo"
              placeholder="Assignment name"
              id="name"
              type="text"
              name="name"
              register={register}
              maxLength={20}
              minLength={6}
              pattern={NameRegex}
              require={true}
            />
            {/* Select Course */}
            <div className="flex flex-col">
              <label className="ml-3  font-bold text-indigo-900">Course</label>
              <Controller
                control={control}
                name="course"
                render={({ field: { onChange } }) => (
                  <select
                    id="course"
                    onChange={onChange}
                    className="w-full appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600"
                  >
                    <option value="">--Please choose an option--</option>
                    {courseArray.map((course, index) => {
                      console.log(index);
                      return (
                        <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                          {course.courseName}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
            </div>
            {/* Select Subject */}
            <div className="flex flex-col">
              <label className="ml-3 mt-3 font-bold text-indigo-900">
                Subject
              </label>
              <Controller
                control={control}
                name="subject"
                render={({ field: { onChange } }) => (
                  <select
                    id="subject"
                    onChange={onChange}
                    className="mb-3 w-full appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600"
                  >
                    <option value="">--Please choose an option--</option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Toán
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Tiếng Anh
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Hóa học
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Sinh học
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Vật lý
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Địa lý
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Lịch sử
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Tin học
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Giáo dục công dân
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Giáo dục quốc phòng & an ninh
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Âm nhạc
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Mĩ thuật
                    </option>
                    <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
                      Công nghệ
                    </option>
                  </select>
                )}
              />
            </div>
            {/* Select Date Picker */}
            <label className="ml-3 font-bold text-indigo-900">Date</label>
            <div className="flex flex-row items-center justify-between">
              {/* Start date */}
              <input
                type="datetime-local"
                className="block w-2/5 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-indigo-900 focus:border-blue-500 focus:ring-blue-500 "
                placeholder="Select date start"
                {...register('start', {
                  required: true,
                })}
              />
              <span className="mx-1 text-indigo-900">to</span>
              {/* End Date */}
              <input
                type="datetime-local"
                className="block w-2/5 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-indigo-900 focus:border-blue-500 focus:ring-blue-500  "
                placeholder="Select date end"
                {...register('end', {
                  required: true,
                })}
              />
            </div>
            {/*  Total time */}
            <InputField
              extra="mt-3"
              label="Time"
              label_color="indigo"
              placeholder="Time"
              id="time"
              type="number"
              name="time"
              register={register}
              maxLength={3}
              minLength={1}
              pattern={Phone_NumberRegex}
              require={true}
            />
            {/*  Total mark */}
            <InputField
              extra="mt-3"
              label="Max score"
              label_color="indigo"
              placeholder="Max score"
              id="score"
              type="number"
              name="score"
              register={register}
              maxLength={4}
              minLength={1}
              pattern={Phone_NumberRegex}
              require={true}
            />
            {/* Description */}
            <div className="mt-7 flex flex-col">
              <label className="ml-3 font-bold text-indigo-900">
                Description
              </label>
              <textarea
                id="describe"
                rows={4}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Viết mô tả tại đây"
              ></textarea>
            </div>
            <button type="submit" className="bg-brand-700">
              Test
            </button>
          </div>
        </div>
        <div className="col-span-5 h-full rounded-xl bg-white backdrop-blur-xl">
          <div className="rounded-t-lg bg-brand-700 p-3">
            <div className="text-xl font-bold text-white ">Thêm câu hỏi</div>
          </div>
          <Quiz
            register={register}
          />
        </div>
      </form>
    </>
  );
};

export default New_Assignment;
