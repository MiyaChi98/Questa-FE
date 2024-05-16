'use client';

import useApi from 'app/hooks/useApi';
import DownArrowIcon from 'components/icons/DownArrowIcon';
import SmallPlusIcon from 'components/icons/SmallPlusIcon';
import { useEffect, useState } from 'react';
import ChangeDetail from 'components/icons/ChangeDetail';
import DeleteIcon from 'components/icons/DeleteIcon';
import Form from 'components/teacher/Detail_Form';
import CollapsibleElement from 'components/teacher/CollapsibleElement';
import Select from 'react-select';
import Dropdown from 'components/dropdown';
import DropdownSearch from 'components/dropdown';

const Class = () => {
  const api = useApi();
  const [grades, setGrades] = useState([]);
  const [formDisplay, setFormdisplay] = useState(false);
  const [formType, setFormType] = useState('create');
  const [courseId, setCourseId] = useState();
  const groupGrade = (arr) => {
    const groupedNumbers = {};
    arr.forEach((x) => {
      if (groupedNumbers[x.grade]) {
        groupedNumbers[x.grade].push(x);
      } else {
        groupedNumbers[x.grade] = [x];
      }
    });
    return groupedNumbers;
  };
  const handlePage = async () => {
    const res = await api.get('course/allcourse');
    console.log(res);
    const data = groupGrade(res.data.data);
    const arr = Object.keys(data).map((key) => ({ key, value: data[key] }));
    console.log(arr);
    setGrades(arr);
  };
  useEffect(() => {
    handlePage();
  }, []);
  return (
    <div className="h-full w-full bg-background-100 px-10">
      <div className="rounded-xl text-navy-700">
        <div
          id={formDisplay ? 'overlay' : ''}
          onClick={() => {
            setFormdisplay(false);
          }}
        >
          <Form
            display={formDisplay}
            type={formType}
            courseId={courseId}
            setFormdisplay={setFormdisplay}
            setFormType={setFormType}
            setCourseId={setCourseId}
          />
        </div>
        <div className="tilte flex h-fit items-center justify-end gap-5 p-3 px-7">
          <DropdownSearch
          type='course'
          />
          <div className="button-container flex flex-row gap-5">
            <button
              type="button"
              onClick={() => {
                setFormdisplay(true);
              }}
              className="place-contents-center flex h-fit min-w-[50px] flex-row place-items-center rounded-md bg-green-500 p-2 text-white shadow-lg hover:bg-brand-700"
            >
              <SmallPlusIcon />
              Tạo lớp học
            </button>
          </div>
        </div>
        {/* <hr className="h-0.5 bg-gray-500 mx-7" /> */}
        <div className=" flex flex-col gap-5 px-5">
          {grades.map((grade) => {
            return (
              <CollapsibleElement title={`Khối ${grade.key}`}>
                {grade.value.map((value, index) => {
                  return (
                    <a
                      href={`class/id/?courseId=${value._id}`}
                      className={`mb-3 min-h-16 w-4/5 col-span-${
                        index + 1
                      } flex cursor-pointer flex-col gap-1 rounded-md bg-gray-300 p-3 text-white hover:border hover:bg-cyan-800`}
                    >
                      <div className="flex flex-row justify-between">
                        <p className="font-bold">{value.courseName}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p>Sĩ số : {}</p>
                        <div className="flex flex-row gap-3">
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setFormType('update');
                              setCourseId(value._id);
                              setFormdisplay(true);
                            }}
                            className="flex items-center justify-center rounded-md  p-1 hover:bg-blue-300"
                          >
                            <ChangeDetail />
                          </button>
                          <button className="flex items-center justify-center rounded-md p-1 hover:bg-red-500">
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </CollapsibleElement>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Class;
