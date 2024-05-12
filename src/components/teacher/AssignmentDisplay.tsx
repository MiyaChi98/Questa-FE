import useApi from 'app/hooks/useApi';
import X from 'components/icons/Xicon';
import React, { useEffect, useState } from 'react';
import renderMathInElement from 'utils/renderMath.mjs';
import Countdown, { zeroPad } from 'react-countdown';
import { toast } from 'react-toastify';

const AssignmentDisplay = (props: {
  examData;
  formFields;
  previewDisplay;
  setPreviewDisplay;
}) => {
  const { examData, formFields, previewDisplay, setPreviewDisplay } = props;
  const api = useApi();
  const [date, setDate] = useState(Date.now());
  const handleChange = (event, index) => {
    event.stopPropagation();
    formFields[index]['answer'] = event.target.value;
    const tag = document.querySelector<HTMLDivElement>(`div[id='${index}']`)
    console.log(tag)
    tag.style.backgroundColor = 'rgb(6 182 212)'
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
    console.log(examData)
    console.log(parseInt(examData.total_time))
    console.log('assignment display', formFields);
    renderMathInElement(document.body);
    previewDisplay ? setDate(Date.now()) : null;
  }, [formFields, previewDisplay]);
  return (
    <div
      id="assignment_display"
      className={`${previewDisplay ? '' : 'hidden'} h-fit w-full relative`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="sticky z-50 top-0 left-0 flex h-28 w-full flex-row bg-white border-solid border-4 border-gray-500">
        <div className="flex h-full w-1/3 items-center justify-start px-5"></div>
        <div className="flex h-full w-1/3 flex-col items-center justify-center text-black">
          <p className="font-san-serif mx-5 text-[20px] text-black">
            <span>
              <span className="font-bold">Đề thi: </span>
              {examData.title}
            </span>
          </p>
          <Countdown date={date + 60000*parseInt(examData.total_time)} renderer={renderer} />
        </div>
        <div className="flex h-full w-1/3 flex-row items-center justify-end gap-3 px-5">
          <button className="h-fit w-fit rounded-md border bg-blue-300 p-1 px-2 text-2xl text-white hover:bg-blue-500">
            Nộp bài
          </button>
          <button
            className="h-fit w-fit rounded-md bg-gray-300 p-1 text-white hover:bg-red-500"
            onClick={() => {
              setPreviewDisplay(false);
            }}
          >
            <X />
          </button>
        </div>
      </div>
      <div className='flex flex-row'>
      <div
        className={`m-3 flex h-fit w-3/4 flex-col place-items-center gap-5 rounded-xl border bg-white p-3`}
      >
        {formFields.map((form, index) => {
          if (form === null) {
            return;
          }
          return (
            <div
            key={index}
              className="text-bold mb-5 h-full w-full font-serif text-[20px] text-black"
            >
              <hr />
              <div className="flex flex-row content-center justify-between">
                <p className="m-2 text-[21px] font-bold text-black ">
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
      <div className={`sticky z-50 top-32 right-0 m-3 flex h-fit w-1/4 grid grid-cols-8 place-items-center gap-5 rounded-xl border bg-white p-3 py-7`}>
      {formFields.map((form, index) => {
          if (form === null) {
            return;
          }
          return (
            <div
              id={`${index}`}
              className={`mb-2 h-fit w-full flex items-center justify-center rounded-md text-white bg-gray-300 px-1 ${form.answer? 'bg-blue-500':null}`}
            >
              <div className="flex flex-row content-center justify-between">
                <p className="m-2 text-[21px] ">
                 {index + 1}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default AssignmentDisplay;
