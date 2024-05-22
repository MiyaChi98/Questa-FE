'use client';

import React, { useEffect, useState } from 'react'
import useApi from 'app/hooks/useApi';
import { useSearchParams } from 'next/navigation';
import ScoreChart from 'components/teacher/BarChart';
import ScoreTable from 'components/teacher/ScoreTable';
import SubmitTable from 'components/teacher/SubmitTable';

const page = () => {
const api = useApi();
  const searchParams = useSearchParams();
  const examID = searchParams.get('examId');
  const [tableData, setTableData] = useState([])
  const handlePage = async (examID)=>{
    const res = await api.get(`exam/${examID}`)
    console.log(res.data.data)
    setTableData(res.data.data.allSubmitData)
  }
  useEffect(()=>{
    handlePage(examID)
  },[])
  return (
    <div className='w-full px-10 gap-5'>
      <div className='bg-white rounded-md w-full h-96 flex flex-row justify-between items-center px-5 gap-10'>
        <div className='flex-auto flex flex-col gap-3'>
        <p className='text-[26px] text-navy-700 font-bold'>Giữa kì toán lớp 7A</p>
          <p className='text-[20px] text-navy-700 font-medium'>Bảng thống kê</p>
        <ScoreTable/>
        </div>
      <ScoreChart/>
      </div>
      <div className='bg-white rounded-md w-full px-5'>
        {tableData&&<SubmitTable courseID={undefined} tableData={tableData} currentPage={''} setCurrentPage={undefined} />}
      </div>
      <div></div>
    </div>
    
  )
}

export default page