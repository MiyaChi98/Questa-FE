import useApi from 'app/hooks/useApi';
import React, { useEffect, useState } from 'react'
import renderMathInElement from 'utils/renderMath.mjs';

const AssignmentDisplay = (
  props:{
    examData
    formFields
    previewDisplay
    setPreviewDisplay
  }
) => {
  const {examData,formFields,previewDisplay,setPreviewDisplay} = props
  const api = useApi();
  const handleChange = (event, index) => {
    event.stopPropagation();
    formFields[index]['answer'] = event.target.value
  };
  useEffect(() => {
    console.log('assignment display',formFields)
  },[formFields]);
  return (
    <>
    <div
    className='w-full h-28 bg-white'
    >
      <div
      className='w-2/3'>
      </div>
      <div
      className='w-1/3'>
      </div>
    </div>
    <div  
    id='assignment_display'
    className={`${
      previewDisplay ? '' : 'hidden'
    } w-2/3 h-fit m-3 flex flex-col border rounded-xl place-items-center gap-5 p-3 bg-white`}
    onClick={(e) => {
      e.stopPropagation();
    }}
    >
    {formFields.map((form, index) => {
      if (form === null) {
        return;
      }
      return (
        <div
          key={index}
          className="mb-5 w-full h-full text-black font-serif text-[20px] text-bold"
        >
          <hr />
          <div className="flex flex-row content-center justify-between">
            <p className="m-2 text-black text-[21px] font-bold ">Câu {index + 1}:</p>
          </div>
          <hr className="h-0.5 bg-white"/>
          {/* Question,Img,Audio */}
          <div className="my-2 flex h-full w-full flex-col gap-2 p-2">
            <div className="flex flex-col place-content-center place-items-center gap-2">
              <div
                id={`${index}_display_question`}
                className="h-fit w-full text-black p-2.5 outline-none"
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
                  src= {form.img}
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
                    onChange={(event) =>
                      handleChange(event, index)
                    }
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
                    onChange={(event) =>
                      handleChange(event, index)
                    }
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
                  > {form.C}</div>
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
                    onChange={(event) =>
                      handleChange(event, index)
                    }
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
                  > {form.B}</div>
                </div>
                <div className="D flex flex-row place-items-center gap-2">
                  <input
                    type="radio"
                    id={`${index}_display_answer_D`}
                    name={`${index}_display_answer`}
                    value="D"
                    onChange={(event) =>
                      handleChange(event, index)
                    }
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
                  > {form.D}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
  </>
  )
}

export default AssignmentDisplay
