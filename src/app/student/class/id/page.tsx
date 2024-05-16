'use client';

import useApi from 'app/hooks/useApi';
import Download from 'components/icons/DashCurveDown';
import ExamDropdown from 'components/teacher/ExamDropdown';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
  const api = useApi();
  const searchParams = useSearchParams();
  const [examData, setExamData] = useState();
  const currentCourseID = searchParams.get('courseId');
  const handlePage = async () => {
    const allExam = await api.get(`exam/course/${currentCourseID}`);
    console.log('here');
    await setExamData(allExam.data.data);
    console.log(allExam.data.data);
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
  }, [currentCourseID]);
  return (
    <div className={`flex h-full w-full flex-col px-10 gap-3 font-sans`}>
      <div className="flex flex-row justify-between">
        <p className="text-[20px] font-medium text-navy-700"></p>
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
      </div>
      <div className="h-fit w-full flex flex-col items-center justify-center gap-3 bg-white text-navy-700 rounded-xl py-5">
        {examData !== undefined &&
          examData.map((exam) => {
            return (
              <ExamDropdown title={exam._id}>
                {exam.documents.map((doc) => {
                  return (
                    <a
                      href="#"
                      className="m-3 flex min-h-16 w-[96%] cursor-pointer flex-col gap-1 rounded-md bg-gray-100/50 p-3 hover:bg-gray-500 hover:text-white"
                    >
                      <div className="grid h-full w-full grid-cols-4">
                        <div className="flex flex-col h-full items-start justify-center font-bold ">
                         <p className=''>{doc.title}</p> 
                         <p className='font-thin'>Điểm số: <span className='font-normal'>{doc.studentSubmit? doc.studentSubmit.toFixed(2):'Chưa có dữ liệu'}</span></p>
                         <p className='font-thin'>Được vào thi vào lúc: <span className='font-normal'>{formatDate(doc.start)}-{formatDate(doc.end)}</span></p>
                         <p className='font-thin'>Thời gian làm đề: <span className='font-normal'>{doc.total_time}</span></p>
                        </div>
                        <div className="flex h-full items-center justify-center">
                          {doc.avgScore.length
                            ? doc.avgScore[0].avgValue.toFixed(2)
                            : 'Chưa có dữ liệu'}
                        </div>
                        <div className="flex h-full items-center justify-center">{`${doc.numberofSubmit} đã nộp`}</div>
                        <div className="flex h-full items-center justify-center">
                        {doc.studentSubmit?
                        <a 
                        href='#'
                        className='font-thin hover:text-blue-700'>Xem kq</a>
                        :
                        <a
                        href={`test/?examId=${doc._id}`}
                        className='font-thin hover:text-blue-700'>Vao phong thi</a>
                        }
                        </div>
                      </div>
                    </a>
                  );
                })}
              </ExamDropdown>
            );
          })}
      </div>
    </div>
  );
};

export default page;
