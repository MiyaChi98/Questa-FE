'use client';

import useApi from 'app/hooks/useApi';
import InputField from 'components/fields/InputField';
import AssignmentDisplay from 'components/teacher/AssignmentDisplay';
import Quiz from 'components/teacher/Quiz';
import { NameRegex } from 'constants/Regex/name.regex';
import { Phone_NumberRegex } from 'constants/Regex/phone-number.regex';
import { useEffect, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { onChange } from 'react-toastify/dist/core/store';
import renderMathInElement from 'utils/renderMath.mjs';

const New_Assignment = () => {
  const api = useApi();
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm()
  const [courseArray, setCourseArray] = useState([]);
  const [formFields, setFormFields] = useState([
    {
      question: '',
      img: '',
      audio: '',
      A: '',
      B: '',
      C: '',
      D: '',
      answer: 'A',
    },
  ]);
  const [assignmentData,setAssignmentData] =useState([])
  const [previewDisplay, setPreviewDisplay] = useState(false);
  const handlePage = async () => {
    const res = await api.get(`course/allcourse`);
    console.log(res.data.data);
    setCourseArray(res.data.data);
  };
  const onSubmit = async (data,formFields)=>{
    for (let quiz of formFields) {
      for (let [key, value] of Object.entries(quiz)) {
        if(key!='img'&&key!='audio'){
          value = preStringProcessor(value.toString())
          console.log(preStringProcessor(value.toString()))
          console.log(value)
        }
    }
  }
    data['total_time'] = parseInt(data['total_time'])
    data['total_mark'] = parseInt(data['total_mark'])
    const createExamRes = await api.post(`exam`,{
      ...data,
      quizArray: formFields
    })
    console.log(createExamRes)
  };
  const examData = watch()
  const preStringProcessor = (inputString) =>{
    const regex = /\*katex\*([^*]+?)\*katex\*/g;
    const regex1 = /\*begin\*([^*]+?)\*end\*/g;
    const processedString = inputString.replace(regex, (match, content) => {
      console.log(String.raw`\(${content}\)`)
      return String.raw`\(${content}\)`;
    });
    const finalString = processedString.replace(regex1,'')
    console.log(finalString)
    return finalString;
  }
  const getFile = async (fileName: string) =>{
    console.log(fileName)
    const res = await api.get(`quiz/file/${fileName}`)
    return res.data.data.fileUrl
  }
  const getDisplayData = async ()=>{
    const data = formFields.map(async (form,index)=>{
      if(form.img)
        {
          form.img = await getFile(form.img)
          console.log(form.img)
        }
      return form
    })
    const resolvedValues = await Promise.all(data);
    return resolvedValues
  }
  useEffect(() => {
    handlePage();
    renderMathInElement(document.body)
  }, [previewDisplay]);
  return (
    <>
      <form
        className=" w-full h-full flex flex-row mt-5"
        onSubmit={
          handleSubmit((data)=>{
            onSubmit(data,formFields)
          })
        }
      >
      <div 
      id={previewDisplay ? 'overlay_bgGray' : ''}
      onClick = {async ()=>{
        setPreviewDisplay(false)
        console.log(examData)
        console.log(formFields)
      }}
      >
        <AssignmentDisplay formFields={assignmentData} previewDisplay={previewDisplay} setPreviewDisplay={setPreviewDisplay} examData={examData}/>
      </div>
        <div className="w-1/5	sticky top-4 h-fit rounded-xl bg-white mr-4">
          <div className="rounded-t-lg bg-brand-700 p-3">
            <div className="text-[26px] font-bold text-white ">
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
              name="title"
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
                name="courseId"
                render={({ field: { onChange } }) => (
                  <select
                    id="courseId"
                    onChange={onChange}
                    className="w-full appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600"
                  >
                    <option value="">--Please choose an option--</option>
                    {courseArray.map((course, index) => {
                      console.log(index);
                      return (
                        <option 
                        value={course._id}
                        className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
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
              name="total_time"
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
              name="total_mark"
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
                {...register('description')}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Viết mô tả tại đây"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex-auto w-4/5 rounded-xl bg-white ">
          <div className="rounded-t-lg flex flex-row justify-between bg-brand-700 p-3">
            <div className="text-[26px] font-bold text-white ">Thêm câu hỏi</div>
            <button
            type='button'
            onClick={
              async ()=> {
                setPreviewDisplay(true)
                const data = await getDisplayData()
                console.log(data)
                setAssignmentData(data)
              }
            }
            className='min-w-[80px] text-[26px] font-bold text-indigo-900 rounded-md bg-white'>
              Xem trước
            </button>
            <button
            type='submit'
            className='min-w-[80px] text-[26px] font-bold text-indigo-900 rounded-md bg-white'>
              Lưu
            </button>
          </div>
          <Quiz
            formFields={formFields} 
            setFormFields={setFormFields}                      />
        </div>
      </form>
    </>
  );
};

export default New_Assignment;
function async() {
  throw new Error('Function not implemented.');
}

