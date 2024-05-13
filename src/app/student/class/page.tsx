'use client';

import useApi from 'app/hooks/useApi';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import avatar from '/public/img/avatars/avatar11.png';
import SmallPlusIcon from 'components/icons/SmallPlusIcon';
import { BsCalendar2Event } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import CodeInput from 'components/student/CodeInput';


const Class = () => {
  type teacher = {
    _id: string;
    teacherName: string;
    teacherEmail: string;
    teacherPhone: string;
    teacherImg: {
      fileUrl: string;
      s3Name: string;
    };
  };

  type course = {
    _id: string;
    courseName: string;
    courseDescription: string;
    grade: number;
    code: string;
  };

  type student = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    zone: [string];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  type exam = {
    _id: string;
    total_mark: number;
    total_time: number;
    courseId: string;
    teacherId: string;
    createdAt: string;
    updatedAt: string;
    start:string;
    end:string;
    __v: number;
    title: string;
  };

  type mainStructure = {
    teacher: teacher;
    course: course;
    student: [student];
    exams: [{
      exam: exam,
      studentSubmition
    }];
  };
  const api = useApi();
  const { data: session } = useSession();
  // const [user, setUser] = useState(undefined);
  const userID = session?.user._id;
  const [courses, setCourses] = useState<mainStructure[]>();
  const [popUpDisplay, setPopUpDisplay] = useState(false);
  const handlePage = async () => {
    const res = await api.get('course/student/allcourse');
    console.log(res);
    setCourses(res.data.data);
  };
  const formatDate = (mongoDate) => {
    if(mongoDate){
      const date = new Date(mongoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero based, so we add 1
    const year = date.getFullYear();
  
    // Padding with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
    } else {
      return 'Không dữ liệu'
    }
  };
  useEffect(() => {
    handlePage();
  }, []);
  return (
    <div className="flex h-fit w-full flex-col mt-5 px-10">
        <div
        id={popUpDisplay ? 'overlay' : ''}
        onClick={() => {
          setPopUpDisplay(false);
        }}
      >
        <CodeInput
          display={popUpDisplay}
          setDisplay={setPopUpDisplay}
          userId={userID}
          />
      </div>
      <div className="flex mb-5 w-full flex-row justify-between ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="min-w-72 rounded-md border border-gray-300 px-4 py-2 pr-10 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <button
          type="button"
          onClick={()=>{setPopUpDisplay(true)}}
          className="place-contents-center flex h-fit min-w-[50px] flex-row place-items-center rounded-md bg-green-500 p-2 text-white shadow-lg hover:bg-brand-700"
        >
          <SmallPlusIcon />
          Tham gia lớp
        </button>
      </div>
      <div className="grid h-fit w-full grid-cols-3 gap-5">
        {courses &&
          courses.map((course, index) => {
            return (
              <a
              href={`class/id/?courseId=${course.course._id}`} 
              className="flex flex-col rounded-md bg-white p-3 hover:cursor-pointer ">
                <div className="flex h-12 w-full flex-row gap-2 bg-white text-gray-900">
                  <div className="rounded-full bg-gray-100 p-1">
                    <Image
                      width="2"
                      height="20"
                      className="h-10 w-10 rounded-full"
                      src={
                        course.teacher.teacherImg.fileUrl
                          ? course.teacher.teacherImg.fileUrl
                          : avatar
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-[16px] text-gray-700">
                      {course.teacher.teacherName}
                    </span>
                    <span className="text-[12px] font-bold text-navy-700">
                      {course.course.courseName}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-2 gap-2">
                  <div className="flex flex-row text-navy-700 items-center justify-start gap-2">
                    <BsCalendar2Event/> Đề thi mới nhất
                  </div>
                  {course.exams.slice(0, 2).map((exam,index)=>{
                    return (
                      <div className="flex flex-row h-fit text-navy-700 items-center justify-start gap-2 bg-gray-300/50 rounded-md ml-5">
                        <div className={`h-full w-fit p-1 bg-gray-500/50 text-white rounded-ss-md rounded-es-md items-center justify-center ${exam.studentSubmition? '':'text-red-700'}`}>{exam.studentSubmition? 'Đã nộp':'Chưa nộp'}</div>
                        <div className='h-full p-1 flex flex-col'>
                          <span className='font-bold'>{exam.exam.title}</span> 
                          <span>Hạn nộp: {formatDate(exam.exam.end)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Class;
