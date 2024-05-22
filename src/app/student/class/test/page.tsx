'use client';

import useApi from 'app/hooks/useApi';
import X from 'components/icons/Xicon';
import SubmitPopUp from 'components/student/SubmitPopUp';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { toast } from 'react-toastify';
import renderMathInElement from 'utils/renderMath.mjs';

const page = () => {
  const api = useApi();
  const searchParams = useSearchParams();
  const [date, setDate] = useState(Date.now());
  const [examData, setExamData] = useState();
  const [violations,setViolations] =useState(0)
  const [display, setDisplay] = useState(false)
  const [formFields, setFormFields] = useState<any[]>();
  const currentExamID = searchParams.get('examId');
  const getFile = async (fileName: string) => {
    console.log(fileName);
    const res = await api.get(`quiz/file/${fileName}`);
    return res.data.data.fileUrl;
  };
  const getDisplayData = async (quizArr) => {
    const data = quizArr.map(async (form, index) => {
      if (form.img) {
        form.img = await getFile(form.img);
        console.log(form.img);
      }
      return form;
    });
    const resolvedValues = await Promise.all(data);
    return resolvedValues;
  };
  const handlePage = async () => {
    const res = await api.get(`exam/displayExamData/${currentExamID}`);
    console.log(res);
    setExamData(res.data.data.exam);
    setFormFields(await getDisplayData(res.data.data.quiz));
    renderMathInElement(document.body);
    console.log(date);
  };
  const handleChange = (event, index) => {
    event.stopPropagation();
    formFields[index]['answer'] = event.target.value;
    const tag = document.querySelector<HTMLDivElement>(`div[id='${index}']`);
    console.log(tag);
    tag.style.backgroundColor = 'rgb(6 182 212)';
    console.log(formFields);
  };
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      toast.success('Thời gian đã hết');
      toast.success('Bài làm của bạn đã tự động nộp');
    } else {
      return (
        <span className="text-2xl">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };
  useEffect(() => {
    handlePage();
    const page = document.getElementById("overlay_bgWhite");
    // document.addEventListener('visibilitychange', () => {
    //   if (document.hidden) {
    //     setViolations(violations+1)
    //     alert(`Cảnh cáo lần 1!`)
    //   }
    // });
    date ? null : setDate(Date.now());
  }, []);
  return (
    <div id="overlay_bgWhite" className="w-100vw h-100vh overflow-scroll bg-white">
      <div id={display? 'overlay_bgGray' : ''}
      onClick = {()=>{setDisplay(false)}}
      > 
        <SubmitPopUp display={display} submitData={formFields} examId={currentExamID} violations={violations} setDisplay={setDisplay}/>
      </div>
      {examData && (
        <div className="sticky left-0 top-0 z-50 flex h-28 w-full flex-row border-4 border-solid border-gray-500 bg-white">
          <div className="flex h-full w-1/3 items-center justify-start px-5"></div>
          <div className="flex h-full w-1/3 flex-col items-center justify-center text-black">
            <p className="font-san-serif mx-5 text-[20px] text-black">
              <span>
                <span className="font-bold">Đề thi: </span>
                {examData.title}
              </span>
            </p>
            <Countdown
              date={date + 60000 * parseInt(examData.total_time)}
              renderer={renderer}
            />
          </div>
          <div className="flex h-full w-1/3 flex-row items-center justify-end gap-3 px-5">
            <button 
            onClick={()=>{
              setDisplay(true)
            }}
            className="h-fit w-fit rounded-md border bg-blue-300 p-1 px-2 text-2xl text-white hover:bg-blue-500">
              Nộp bài
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-row">
        <div
          className={`m-3 flex h-fit w-3/4 flex-col place-items-center gap-5 rounded-xl border bg-white p-3`}
        >
          {formFields &&
            formFields.map((form, index) => {
              if (form === null) {
                return;
              }
              return (
                <div
                  key={index}
                  className="text-bold mb-5 h-full w-full font-serif text-[20px] text-black"
                >
                  <hr />
                  <div className="flex flex-row content-center justify-between bg-gray-100">
                    <p className="m-2 text-[21px] font-bold text-black">
                      Câu {index + 1}:
                    </p>
                  </div>
                  <hr className="h-0.5 bg-white" />
                  {/* Question,Img,Audio */}
                  <div className="my-2 flex h-full w-full flex-col gap-2 p-2">
                    <div className="flex flex-col place-content-center place-items-center gap-2">
                      <div
                        id={`${index}_display_question`}
                        className="h-fit w-full p-2.5 text-black outline-none"
                      >
                        {form.question}
                      </div>
                      {/* Image */}
                      <div
                        className={`${
                          form.img ? '' : 'hidden'
                        } relative h-fit w-fit`}
                      >
                        <img
                          id={`${index}_display_img`}
                          src={form.img}
                          className={`${
                            form.img ? '' : 'hidden'
                          } h-56 w-full object-scale-down`}
                        />
                      </div>
                      {/* Audio */}
                      <div
                        className={`${
                          form.audio ? '' : 'hidden'
                        } relative h-fit w-fit `}
                      >
                        <audio
                          id={`${index}_display_audio`}
                          src={form.audio}
                          controls
                          controlsList="nodownload"
                          className={`${
                            form.audio ? '' : 'hidden'
                          } rounded-lg border border-indigo-900`}
                        ></audio>
                      </div>
                    </div>
                    {/* Answer */}
                    <div className="flex w-full flex-row justify-between gap-10">
                      {/* A&C */}
                      <div className="my-3 flex w-1/2 flex-col gap-5">
                        <div className="A flex flex-row place-items-center gap-2">
                          <input
                            type="radio"
                            id={`${index}_display_answer_A`}
                            name={`${index}_display_answer`}
                            value="A"
                            onChange={(event) => handleChange(event, index)}
                            className="peer hidden"
                            required
                          />
                          <label
                            htmlFor={`${index}_display_answer_A`}
                            className="h-10 w-10 cursor-pointer place-content-center rounded-full border border-gray-200 bg-white p-3 text-[20px] font-bold text-indigo-900 hover:border-gray-600 hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white"
                          >
                            A
                          </label>
                          <div
                            id={`${index}_display_answer_A_content`}
                            className="flex h-12 w-full border-none bg-white p-3 outline-none "
                          >
                            {form.A}
                          </div>
                        </div>
                        <div className="C flex flex-row place-items-center gap-2">
                          <input
                            type="radio"
                            id={`${index}_display_answer_C`}
                            name={`${index}_display_answer`}
                            value="C"
                            onChange={(event) => handleChange(event, index)}
                            className="peer hidden"
                            required
                          />
                          <label
                            htmlFor={`${index}_display_answer_C`}
                            className="h-10 w-10 cursor-pointer place-content-center rounded-full border border-gray-200 bg-white p-3 text-[20px] font-bold text-indigo-900 hover:border-gray-600 hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white"
                          >
                            C
                          </label>
                          <div
                            id={`${index}_display_answer_C_content`}
                            className="flex h-12 w-full border-none bg-white p-3 outline-none "
                          >
                            {' '}
                            {form.C}
                          </div>
                        </div>
                      </div>
                      {/* B&D */}
                      <div className="my-3 flex w-1/2 flex-col gap-5">
                        <div className="B flex flex-row place-items-center gap-2">
                          <input
                            type="radio"
                            id={`${index}_display_answer_B`}
                            name={`${index}_display_answer`}
                            value="B"
                            onChange={(event) => handleChange(event, index)}
                            className="peer hidden"
                            required
                          />
                          <label
                            htmlFor={`${index}_display_answer_B`}
                            className="h-10 w-10 cursor-pointer place-content-center rounded-full border border-gray-200 bg-white p-3 text-[20px] font-bold text-indigo-900 hover:border-gray-600 hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white"
                          >
                            B
                          </label>
                          <div
                            id={`${index}_display_answer_B_content`}
                            className="flex h-12 w-full border-none bg-white p-3 outline-none "
                          >
                            {' '}
                            {form.B}
                          </div>
                        </div>
                        <div className="D flex flex-row place-items-center gap-2">
                          <input
                            type="radio"
                            id={`${index}_display_answer_D`}
                            name={`${index}_display_answer`}
                            value="D"
                            onChange={(event) => handleChange(event, index)}
                            className="peer hidden"
                            required
                          />
                          <label
                            htmlFor={`${index}_display_answer_D`}
                            className="h-10 w-10 cursor-pointer place-content-center rounded-full border border-gray-200 bg-white p-3 text-[20px] font-bold text-indigo-900 hover:border-gray-600 hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white"
                          >
                            D
                          </label>
                          <div
                            id={`${index}_display_answer_D_content`}
                            className="flex h-12 w-full border-none bg-white p-3 outline-none "
                          >
                            {' '}
                            {form.D}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className={`sticky right-0 top-32 z-50 m-3 flex grid h-fit w-1/4 place-items-center gap-5 rounded-xl border bg-white p-3 py-7 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6`}
        >
          {formFields &&
            formFields.map((form, index) => {
              if (form === null) {
                return;
              }
              return (
                <div
                  id={`${index}`}
                  className={`mb-2 flex h-fit w-full items-center justify-center rounded-md bg-gray-300 px-1 text-white ${
                    form.answer ? 'bg-blue-500' : null
                  }`}
                >
                  <div className="flex flex-row content-center justify-between">
                    <p className="m-2 text-[21px] ">{index + 1}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default page;
