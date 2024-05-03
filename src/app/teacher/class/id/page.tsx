'use client';

import useApi from 'app/hooks/useApi';
import StudentTable from 'components/teacher/StudentTable';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const id = () => {
  const api = useApi()
  const searchParams = useSearchParams();
  const [currentPage,setCurrentPage] =useState(true)
  const [tableData,setTableData] =useState(true)
  const currentCourseID = searchParams.get('courseId');
  const handlePage = async ()=>{
    const res = await api.get(`course/${currentCourseID}/allStudent`)
    setTableData(res.data.data)
  }
  useEffect(()=>{
    currentPage? document.getElementById('class').focus() : document.getElementById('overrall').focus()
    handlePage()
  },[currentCourseID])
  return (
    <div className="flex h-full w-full flex-col text-black">
      <div className="flex h-12 flex-row rounded-se-full rounded-ss-full bg-gray-100">
        <button
        id='class'
          type="button"
          onClick={()=>{
            setCurrentPage(true)
          }}
          className="flex h-full w-1/2 items-center justify-center rounded-ss-full text-black focus:bg-gray-700 focus:text-white outline-none"
        >
          <span className="text-center font-bold">Danh sách lớp </span>
        </button>
        <button
        id='overrall'
          type="button"
          onClick={()=>{
            setCurrentPage(false)
          }}
          className="flex h-full w-1/2 items-center justify-center rounded-se-full text-black focus:bg-gray-700 focus:text-white"
        >
          <span className="text-center font-bold">Lịch sử</span>
        </button>
      </div>
      <div className="flex-auto bg-gray-100 p-7">
        <StudentTable tableData={tableData}/>
      </div>
    </div>
  );
};
export default id;
