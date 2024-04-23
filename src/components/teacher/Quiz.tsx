'use client';

import katex from "katex";
import useApi from 'app/hooks/useApi';
import ImgIcon from 'components/icons/ImgIcon';
import PlusIcon from 'components/icons/PlusIcon';
import Small_X from 'components/icons/SmallXIcon';
import AudioIcon from 'components/icons/VideoIcon';
import X from 'components/icons/Xicon';
import { useEffect, useState } from 'react';
import renderMathInElement from "utils/renderMath.mjs";
import Render_Math from "./Math_Render";
import MathIcon from "components/icons/MathIcon";
var Latex = require('react-latex');
function Quiz(props: { register; unregister; formFields; setFormFields }) {
  const { register, unregister, formFields, setFormFields } = props;
  const api = useApi();
  const [onFocus, setonFocus] = useState(null)
  const handleChange = (event, index, name?) => {
    renderMathInElement(document.body);
    let data = [...formFields];
    name==='question'?
    data[index][name] = document.querySelector<HTMLDivElement>(`div[id='${index}_${name}']`).textContent:
    name=== 'answer'?  
    data[index][name] = event.target.value:
    data[index][event.target.name] = event.target.value
    setFormFields(data);
    console.log(data);
    
  };
  const handleFileInput = async (event, index: number, name: string) => {
    const file = event.target.files[0];
    console.log(file);
    const test = await api.get(`course/allcourse`);
    console.log(test);
    const res = await api.post(
      `quiz/upload/file`,
      {
        file: file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(res);
    try {
      let data = [...formFields];
      data[index][name] = res.data.data.s3Name;
      //pick the img or audio tag base on the name and index
      const preview = document.querySelector<HTMLSourceElement>(
        `${name}[id='${index}_${name}']`,
      );
      console.log(preview);
      preview.src = res.data.data.imgUrl;
      setFormFields(data);
    } catch (error) {
      console.log(error);
    }
    event.target.value = '';
  };

  const addFields = () => {
    let object = {
      question: '',
      img: '',
      audio: '',
      A: '',
      B: '',
      C: '',
      D: '',
      answer: '',
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
    console.log('after remove', ...data);
  };

  const removeAttribute = (index: number, name: string) => {
    let data = [...formFields];
    data[index][name] = '';
    const preview = document.querySelector<HTMLSourceElement>(
      `${name}[id='${index}_${name}']`,
    );
    preview.src = '';
    setFormFields(data);
  };
  useEffect(()=>{
    console.log(onFocus)
  },[onFocus])

  return (
    <div className="mt-3 flex h-full w-full flex-col place-items-center gap-5 p-3 ">
      {formFields.map((form, index) => {
        if (form === null) {
          return;
        }
        return (
          <div key={index} className="mb-5 w-full bg-gray-600/20 text-indigo-900 shadow-lg shadow-gray-600/50">
            <hr />
            <div className="flex flex-row content-center justify-between bg-gray-600/50">
              <p className="m-2 text-[21px] font-bold ">Câu {index + 1}:</p>
              <div className="flex flex-row">
                {/* Math Equation */}
                <label
                 onClick={()=>{
                  const span = document.createElement("span")
                  const textnode = document.createTextNode('\(c^2 = a^2 + b^2\)')
                  span.appendChild(textnode)
                  const x = document.getElementById(onFocus).appendChild(span)
                 }}
                 className="m-2 w-fit rounded-lg hover:bg-indigo-600 hover:text-white">
                  <MathIcon />
                </label>
                {/* Image */}
                <label className="m-2 w-fit rounded-lg hover:bg-indigo-600 hover:text-white">
                  <ImgIcon />
                  <input
                    name="img"
                    onChange={async (e) => {
                      handleFileInput(e, index, 'img');
                    }}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                </label>
                {/* Audio */}
                <label className="m-2 w-fit rounded-lg hover:bg-indigo-600 hover:text-white">
                  <AudioIcon />
                  <input
                    name="audio"
                    onChange={async (e) => {
                      handleFileInput(e, index, 'audio');
                    }}
                    type="file"
                    className="hidden"
                    accept="audio/*"
                  />
                </label>
                <button
                  className="m-2 w-fit rounded-lg hover:bg-indigo-600 hover:text-white"
                  type="button"
                  onClick={() => {
                    console.log('index', index);
                    removeFields(index);
                  }}
                >
                  <X />
                </button>
              </div>
            </div>
            <hr className="h-0.5 bg-gray-500	" />
            {/* Question,Img,Audio */}
            <div className="flex my-2 h-full w-full flex-col gap-2 p-2">
              <div className="flex flex-col place-content-center place-items-center gap-2">
                <div
                 id={`${index}_question`}
                 contentEditable= {true}
                 onInput={(event) =>
                  {
                   handleChange(event, index, 'question');
                  }}
                  onFocus = {(event) =>{
                    setonFocus(event.target.id),
                    console.log(onFocus)
                  }}
                  data-value = {form.question}
                  className="w-full min-h-40 p-2.5 text-gray-900 bg-white outline-none focus:outline focus:outline-offset-2 focus:outline-blue-500"
                  placeholder="Nội dung câu hỏi"
                >                  
                </div>
                {/* Image */}
                <div
                  className={`${form.img ? '' : 'hidden'} relative h-fit w-fit`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      removeAttribute(index, 'img');
                    }}
                    className="absolute right-0 top-0 rounded-lg hover:bg-indigo-600 hover:text-white"
                  >
                    <X />
                  </button>
                  <img
                    id={`${index}_img`}
                    src=""
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
                  <button
                    type="button"
                    onClick={() => {
                      removeAttribute(index, 'audio');
                    }}
                    className="absolute right-4 top-4 z-10 rounded-lg bg-indigo-600 text-white hover:bg-indigo-900"
                  >
                    <Small_X />
                  </button>
                  <audio
                    id={`${index}_audio`}
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
                  <div className="A flex flex-row gap-2 place-items-center">
                    <input
                      type="radio"
                      id={`${index}_answer_A`}
                      name={`${index}_answer`}
                      value="A"
                      onChange={(event) => handleChange(event, index,'answer')}
                      className="peer hidden"
                      required
                    />
                    <label
                      htmlFor={`${index}_answer_A`}
                      className="p-3 w-10 h-10 text-[20px] font-bold rounded-full cursor-pointer place-content-center border border-gray-200 bg-white text-indigo-900 hover:bg-gray-100 hover:border-gray-600 peer-checked:text-white peer-checked:bg-blue-600"
                    >
                      A
                    </label>
                    <input
                      type="text"
                      required
                      name="A"
                      id={`${index}_answer_A_content`}
                      onChange={(event) => handleChange(event, index)}
                      onFocus = {(event) =>{
                        setonFocus(event.target),
                        console.log(onFocus)
                      }}
                      value={form.A}
                      className="flex h-12 w-full items-center justify-center  border-none bg-white p-3 outline-none "
                    />
                  </div>
                  <div className="C flex flex-row gap-2 place-items-center">
                  <input
                      type="radio"
                      id={`${index}_answer_C`}
                      name={`${index}_answer`}
                      value="C"
                      onChange={(event) => handleChange(event, index,'answer')}
                      className="peer hidden"
                      required
                    />
                    <label
                      htmlFor={`${index}_answer_C`}
                      className="p-3 w-10 h-10 text-[20px] font-bold rounded-full cursor-pointer place-content-center border border-gray-200 bg-white text-indigo-900 hover:bg-gray-100 hover:border-gray-600 peer-checked:text-white peer-checked:bg-blue-600"
                    >
                      C
                    </label>
                    <input
                      type="text"
                      name="C"
                      id={`${index}_answer_C_content`}
                      onChange={(event) => handleChange(event, index)}
                      onFocus = {(event) =>{
                        setonFocus(event.target),
                        console.log(onFocus)
                      }}
                      value={form.C}
                      className="flex h-12 w-full items-center justify-center  border-none bg-white p-3 outline-none "
                    />
                  </div>
                </div>
                {/* B&D */}
                <div className="my-3 flex w-1/2 flex-col gap-5">
                  <div className="B flex flex-row gap-2">
                  <input
                      type="radio"
                      id={`${index}_answer_B`}
                      name={`${index}_answer`}
                      value="B"
                      onChange={(event) => handleChange(event, index,'answer')}
                      className="peer hidden"
                      required
                    />
                    <label
                      htmlFor={`${index}_answer_B`}
                      className="p-3 w-10 h-10 text-[20px] font-bold rounded-full cursor-pointer place-content-center border border-gray-200 bg-white text-indigo-900 hover:bg-gray-100 hover:border-gray-600 peer-checked:text-white peer-checked:bg-blue-600"
                    >
                      B
                    </label>
                    <input
                      type="text"
                      required
                      name="B"
                      id={`${index}_answer_B_content`}
                      onChange={(event) => handleChange(event, index)}
                      onFocus = {(event) =>{
                        setonFocus(event.target),
                        console.log(onFocus)
                      }}
                      value={form.B}
                      className="flex h-12 w-full items-center justify-center  border-none bg-white p-3 outline-none "
                    />
                  </div>
                  <div className="D flex flex-row gap-2">
                  <input
                      type="radio"
                      id={`${index}_answer_D`}
                      name={`${index}_answer`}
                      value="D"
                      onChange={(event) => handleChange(event, index,'answer')}
                      className="peer hidden"
                      required
                    />
                    <label
                      htmlFor={`${index}_answer_D`}
                      className="p-3 w-10 h-10 text-[20px] font-bold rounded-full cursor-pointer place-content-center border border-gray-200 bg-white text-indigo-900 hover:bg-gray-100 hover:border-gray-600 peer-checked:text-white peer-checked:bg-blue-600"
                    >
                      D
                    </label>
                    <input
                      type="text"
                      name="D"
                      id={`${index}_answer_D_content`}
                      onChange={(event) => handleChange(event, index)}
                      onFocus = {(event) =>{
                        setonFocus(event.target),
                        console.log(onFocus)
                      }}
                      value={form.D}
                      className="flex h-12 w-full items-center justify-center  border-none bg-white p-3 outline-none "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button
        className="rounded-full bg-indigo-400 text-white hover:bg-indigo-900"
        onClick={addFields}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
export default Quiz;
