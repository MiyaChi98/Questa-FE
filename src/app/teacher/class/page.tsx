'use client';

import useApi from "app/hooks/useApi";
import DownArrowIcon from "components/icons/DownArrowIcon";
import SmallPlusIcon from "components/icons/SmallPlusIcon";
import { useEffect, useState } from "react";
import ChangeDetail from 'components/icons/ChangeDetail';
import DeleteIcon from 'components/icons/DeleteIcon';
import Form from "components/teacher/Detail_Form";


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
    <div className="bg-white text-black border rounded-xl">
      <div id={formDisplay? 'overlay' : ''}
      onClick = {()=>{setFormdisplay(false)}}
      > 
        <Form display={formDisplay} type={'create'} setFormdisplay={setFormdisplay}/>
      </div>
      <div
      className="tilte h-fit p-5 flex justify-between">
        <p className="text-[30px] ">Danh sách lớp</p>
        <div className="button-container flex flex-row gap-5">
          {/* New Class */}
        <button 
        type="button"
        onClick={()=>{setFormdisplay(true)}}
        className='min-w-[50px] flex flex-row place-contents-center place-items-center h-fit p-3 rounded-md text-white bg-gray-700 hover:bg-blue-700 shadow-lg'
        >
          <SmallPlusIcon/>
          Tạo lớp học
        </button>
        </div>
      </div>
      <hr className="h-0.5 bg-gray-500	" />
      <div
      className="h-fit p-5 flex flex-col gap-5 bg-gray-100">
        {
          grades.map((grade)=>{
            return (
              <div
              className="bg-white rounded-xl">
                <div className="min-h-12 flex px-7 place-items-center place-contents-center justify-between border rounded-xl rounded-ee-none rounded-es-none bg-white shadow-lg">
                <p className="text-[20px]"> Khối {grade.key}</p>
                <DownArrowIcon/>
                </div>
                <div className="p-3 grid grid-cols-5">
                  {grade.value.map((value,index) => {
                    return (
                      <a 
                      href={`class/id/?courseId=${value._id}`}
                      className={`min-h-16 w-48 mb-3 col-span-${index + 1} cursor-pointer text-white rounded-md p-3 hover:bg-blue-300 bg-gray-300 flex flex-col gap-1`}>
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
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Class;
