'use client';

import useApi from 'app/hooks/useApi';
import Button from 'components/button/button';
import StudentTable from 'components/teacher/StudentTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CollapsibleElement from "components/teacher/CollapsibleElement";
import ExamDropdown from 'components/teacher/ExamDropdown';


const id = () => {
  type teacher = {
    _id: string;
    teacherName: string;
    teacherEmail: string;
    teacherPhone: string;
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

  type exams = {
    _id: string;
    total_mark: number;
    total_time: number;
    courseId: string;
    teacherId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    title: string;
  };

  type mainStructure = {
    teacher: teacher;
    course: course;
    student: [student];
    exams: [exams];
  };
  const api = useApi();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentNav, setCurrentNav] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ?? '1',
  );
  const [pageNumbers, setPageNumbers] = useState([1]);
  const [course, setCourse] = useState<mainStructure>();
  const [tableData, setTableData] = useState([]);
  const [examData, setExamData] = useState();
  const currentCourseID = searchParams.get('courseId');
  function handleClick(page: number) {
    if (page === -1) {
      const newPage = parseInt(currentPage) - 1;
      if (newPage >= 1) {
        setCurrentPage(newPage.toString());
      } else {
        toast.error('The previous page does not exist');
      }
    } else if (page === 0) {
      const newPage = parseInt(currentPage) + 1;
      if (newPage <= pageNumbers[pageNumbers.length - 1]) {
        setCurrentPage(newPage.toString());
      } else {
        toast.error('The next page does not exist');
      }
    } else {
      setCurrentPage(page.toString());
    }
  }
  const handlePage = async () => {
    const allStudent = await api.get(`course/${currentCourseID}/allStudent`);
    const allExam = await api.get(`exam/course/${currentCourseID}`);
    setTableData(
      allStudent.data.data.slice(
        (parseInt(currentPage) - 1) * 5,
        parseInt(currentPage) * 5,
      ),
    );
    const numberOfPage = Array.from(
      { length: Math.ceil(allStudent.data.data.length / 5) },
      (_, i) => i + 1,
    );
    setPageNumbers(numberOfPage);
    const course = await api.get(`course/${currentCourseID}`);
    console.log(course.data.data);
    setCourse(course.data.data);
    setExamData(allExam.data.data);
  };
  useEffect(() => {
    currentNav
      ? document.getElementById('class').focus()
      : document.getElementById('overrall').focus();
    handlePage();
    const params = new URLSearchParams(searchParams);
    params.set('page', currentPage);
    replace(`${pathname}?${params.toString()}`);
  }, [currentCourseID, currentPage]);
  return (
    <div className="mt-5 flex flex-col text-black">
      <div className="flex h-12 flex-row rounded-se-full rounded-ss-full bg-white">
        <button
          id="class"
          type="button"
          onClick={() => {
            setCurrentNav(true);
          }}
          className={`flex h-full w-1/2 items-center justify-center rounded-ss-full text-black ${
            currentNav ? 'bg-gray-700 text-white outline-none' : ''
          }`}
        >
          <span className="text-center font-bold">Danh sách lớp </span>
        </button>
        <button
          id="overrall"
          type="button"
          onClick={() => {
            setCurrentNav(false);
          }}
          className={`flex h-full w-1/2 items-center justify-center rounded-se-full text-black ${
            currentNav ? '' : 'bg-gray-700 text-white outline-none'
          }`}
        >
          <span className="text-center font-bold">Tổng quan</span>
        </button>
      </div>
      <hr className="m-0 h-0.5 bg-gray-700 outline-none" />
      <div className="flex-auto bg-white p-7">
        <div className={`flex h-full w-full flex-col gap-3 font-sans ${currentNav? '':'hidden'}`}>
          {course && course.course && (
            <p className="text-[20px] font-bold">
              Lớp {course.course.courseName}
            </p>
          )}
          {course && course.course && (
            <p className="text-[16px]">Mã vào lớp : {course.course.code}</p>
          )}
          <StudentTable tableData={tableData} />
          <div className="mr-10 mt-3 grid justify-items-end text-black">
            <nav aria-label="Page navigation example">
              <ul className="list-style-none flex">
                <li onClick={() => handleClick(-1)}>
                  <Button
                    name="Previous"
                    small={false}
                    textcolor={'black'}
                    bg={'bg-gray-700'}
                  />
                </li>
                {pageNumbers.map((page) => {
                  return (
                    <li onClick={() => handleClick(page)}>
                      <Button
                        name={page.toString()}
                        small={true}
                        focus={currentPage === page.toString()}
                        textcolor={'black'}
                        bg={'bg-gray-700'}
                      />
                    </li>
                  );
                })}
                <li onClick={() => handleClick(0)}>
                  <Button
                    name="Next"
                    small={false}
                    textcolor={'black'}
                    bg={'bg-gray-700'}
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={`flex h-full w-full flex-col gap-3 font-sans ${currentNav? 'hidden':''}`}>
        <div className='flex justify-between flex-row'>
        <p className="text-[20px] font-bold">
         Danh sách đã giao
        </p>
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
        {examData !== undefined && examData.map((exam)=>{
          return(
              <ExamDropdown title={exam._id}>
                {exam.documents.map((doc)=>{
                  return (
                    <a 
                    href='#'
                    className='w-full min-h-12'>
                    </a>
                  )
                })}
              </ExamDropdown>
          )
        })}
        </div>
      </div>
    </div>
  );
};
export default id;
