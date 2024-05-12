'use client';

import useApi from "app/hooks/useApi";
import DownArrowIcon from "components/icons/DownArrowIcon";
import SmallPlusIcon from "components/icons/SmallPlusIcon";
import { useEffect, useState } from "react";
import ChangeDetail from 'components/icons/ChangeDetail';
import DeleteIcon from 'components/icons/DeleteIcon';
import Form from "components/teacher/Detail_Form";
import CollapsibleElement from "components/teacher/CollapsibleElement";


const Class = () => {
  const api = useApi()
  const [grades,setGrades] =useState([])
  const [formDisplay, setFormdisplay] = useState(false)
  const groupGrade = (arr)=> {
    const groupedNumbers = {};
    arr.forEach(x => {
        if (groupedNumbers[x.grade]) {
            groupedNumbers[x.grade].push(x);
        } else {
            groupedNumbers[x.grade] = [x];
        }
    });
    return groupedNumbers;
  }
  const handlePage = async ()=>{
    const res = await api.get('course/allcourse')
    console.log(res)
    const data = groupGrade(res.data.data)
    const arr = Object.keys(data).map(key => ({ key, value: data[key] }));
    console.log(arr)
    setGrades(arr)
  }
  useEffect(()=>{
    handlePage()
  },[])
  return (
    <div className="w-full h-full px-10 bg-background-100">
    <div className="text-navy-700 rounded-xl">
      <div id={formDisplay? 'overlay' : ''}
      onClick = {()=>{setFormdisplay(false)}}
      > 
        <Form display={formDisplay} type={'create'} setFormdisplay={setFormdisplay}/>
      </div>
      <div
      className="tilte h-fit p-3 px-7 flex justify-end items-center gap-5">
        {/* Search */}
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
        <div className="button-container flex flex-row gap-5">
        <button 
        type="button"
        onClick={()=>{setFormdisplay(true)}}
        className='min-w-[50px] flex flex-row place-contents-center place-items-center h-fit p-2 rounded-md text-white bg-green-500 hover:bg-brand-700 shadow-lg'
        >
          <SmallPlusIcon/>
          Tạo lớp học
        </button>
        </div>
      </div>
      {/* <hr className="h-0.5 bg-gray-500 mx-7" /> */}
      <div
      className=" px-5 flex flex-col gap-5">
        {
          grades.map((grade)=>{
            return (
              <CollapsibleElement title= {`Khối ${grade.key}`}>
                  {grade.value.map((value,index) => {
                    return (
                      <a 
                      href={`class/id/?courseId=${value._id}`}
                      className={`min-h-16 w-48 mb-3 col-span-${index + 1} cursor-pointer text-white rounded-md p-3 hover:bg-brand-700 bg-gray-300 flex flex-col gap-1`}>
                        <div className="flex flex-row justify-between">
                          <p className="font-bold">{value.courseName}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                          <p>Sĩ số : {}</p>
                          <div className="flex flex-row gap-3">
                          <ChangeDetail/>
                          <DeleteIcon />
                          </div>
                        </div>
                      </a>
                    )
                  }
                  )}
              </CollapsibleElement>
            )
          })
        }
      </div>
    </div>
    </div>
  );
};

export default Class;
