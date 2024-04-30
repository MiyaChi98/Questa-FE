'use client';

import katex from 'katex';
import useApi from 'app/hooks/useApi';
import ImgIcon from 'components/icons/ImgIcon';
import PlusIcon from 'components/icons/PlusIcon';
import Small_X from 'components/icons/SmallXIcon';
import AudioIcon from 'components/icons/VideoIcon';
import X from 'components/icons/Xicon';
import { useEffect, useState } from 'react';
import renderMathInElement from 'utils/renderMath.mjs';
import MathIcon from 'components/icons/MathIcon';
import MathInput from 'react-math-keyboard';
import Render_Math from './Math_Render';

function Quiz(props: { formFields; setFormFields }) {
  const {formFields, setFormFields } = props;
  const api = useApi();
  const [onFocus, setonFocus] = useState(null);
  const [latex, setLatex] = useState('');
  const [renderMathDisplay, setRenderMathDisplay] = useState(false);
  const handleChange = (event, index, name?) => {
    renderMathInElement(document.body);
    //stop event propagation to parent conponent
    //because Math_Render manually fire oninput event to div
    event.stopPropagation();
    let data = [...formFields];
    name === 'answer'
      ? (data[index][name] = event.target.value)
      : (data[index][name] = preStringProcessor(document.getElementById(
          event.target.id,
        ).textContent
      ));
    setFormFields(data);
    console.log(data);
  };
  const preStringProcessor = (inputString) =>{
    const regex = /\*katex\*([^*]+?)\*katex\*/g;
    const regex1 = /\*begin\*([^*]+?)\*end\*/g;
    const processedString = inputString.replace(regex, (match, content) => {
      console.log(String.raw`\(${content}\)`)
      return String.raw`\(${content}\)`;
    });
    const finalString = processedString.replace(regex1,'')
    console.log(finalString)
    return finalString;
  }
  const handleFileInput = async (event, index: number, name: string) => {
    const file = event.target.files[0];
    console.log(file);
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
      preview.src = res.data.data.fileUrl;
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
  // useEffect(() => {
  // },);

  return (
    <>
      <div 
      id={renderMathDisplay ? 'overlay_bgGray' : ''}
      onClick = {()=>{setRenderMathDisplay(false)}}
      >
        <Render_Math
          display={renderMathDisplay}
          setLatex={setLatex}
          latex={latex}
          onFocus={onFocus}
          setRenderMathDisplay={setRenderMathDisplay}
        />
      </div>
      <div className="mt-3 flex flex-col place-items-center gap-5 p-3 ">
        {formFields.map((form, index) => {
          if (form === null) {
            return;
          }
          return (
            <div
              key={index}
              className="mb-5 w-full bg-gray-600/20 text-indigo-900"
            >
              <hr />
              <div className="flex flex-row content-center justify-between bg-gray-600/50">
                <p className="m-2 text-[21px] font-bold ">Câu {index + 1}:</p>
                <div className="flex flex-row">
                  {/* Math Equation */}
                  <label
                    onClick={() => {
                      setRenderMathDisplay(true);
                    }}
                    className="m-2 w-fit rounded-lg hover:bg-indigo-600 hover:text-white"
                  >
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
              <div className="my-2 flex h-full w-full font-serif text-[20px] flex-col gap-2 p-2">
                <div className="flex flex-col place-content-center place-items-center gap-2">
                  <div
                    id={`${index}_question`}
                    contentEditable={true}
                    onInput={(event) => {
                      handleChange(event, index, 'question');
                    }}
                    onFocus={(event) => {
                      setonFocus(event.target.id)
                      console.log(onFocus);
                    }}
                    className=" min-h-28 w-full bg-white p-2.5 text-gray-900 outline-none focus:outline focus:outline-offset-2 focus:outline-blue-500"
                  ></div>
                  {/* Image */}
                  <div
                    className={`${
                      form.img ? '' : 'hidden'
                    } relative h-fit w-fit`}
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
                    <div className="A flex flex-row place-items-center gap-2">
                      <input
                        type="radio"
                        id={`${index}_answer_A`}
                        name={`${index}_answer`}
                        value="A"
                        onChange={(event) =>
                          handleChange(event, index, 'answer')
                        }
                        className="peer hidden"
                        required
                      />
                      <label
                        htmlFor={`${index}_answer_A`}
                        className="h-10 w-10 cursor-pointer place-content-center rounded-full border border-gray-200 bg-white p-3 font-bold text-indigo-900 hover:border-gray-600 hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white"
                      >
                        A
                      </label>
                      <div
                        id={`${index}_answer_A_content`}
                        contentEditable={true}
                        onInput={(event) => {
                          handleChange(event, index, 'A');
                        }}
                        onFocus={(event) => {
                          setonFocus(event.target.id), console.log(onFocus);
                        }}
                        className=" min-h-12 w-full border-none bg-white p-3 outline-none "
                      ></div>
                    </div>
                    <div className="C flex flex-row place-items-center gap-2">
                      <input
                        type="radio"
                        id={`${index}_answer_C`}
                        name={`${index}_answer`}
                        value="C"
                        onChange={(event) =>
                          handleChange(event, index, 'answer')
                        }
                        className="peer hidden"
                        required
                      />
                      <label
                        htmlFor={`${index}_answer_C`}
                        className="h-10 w-10 cursor-pointer place-content-center rounded-full border border-gray-200 bg-white p-3 font-bold text-indigo-900 hover:border-gray-600 hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white"
                      >
                        C
                      </label>
                      <div
                        id={`${index}_answer_C_content`}
                        contentEditable={true}
                        onInput={(event) => {
                          handleChange(event, index, 'C');
                        }}
                        onFocus={(event) => {
                          setonFocus(event.target.id), console.log(onFocus);
                        }}
                        className="min-h-12 w-full border-none bg-white p-3 outline-none "
                      ></div>
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
                        onChange={(event) =>
                          handleChange(event, index, 'answer')
                        }
                        className="peer hidden"
                        required
                      />
                      <label
                        htmlFor={`${index}_answer_B`}
                        className="h-10 w-10 cursor-pointer place-content-center rounded-full border border-gray-200 bg-white p-3 font-bold text-indigo-900 hover:border-gray-600 hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white"
                      >
                        B
                      </label>
                      <div
                        id={`${index}_answer_B_content`}
                        contentEditable={true}
                        onInput={(event) => {
                          handleChange(event, index, 'B');
                        }}
                        onFocus={(event) => {
                          setonFocus(event.target.id), console.log(onFocus);
                        }}
                        className=" min-h-12 w-full border-none bg-white p-3 outline-none "
                      ></div>
                    </div>
                    <div className="D flex flex-row gap-2">
                      <input
                        type="radio"
                        id={`${index}_answer_D`}
                        name={`${index}_answer`}
                        value="D"
                        onChange={(event) =>
                          handleChange(event, index, 'answer')
                        }
                        className="peer hidden"
                        required
                      />
                      <label
                        htmlFor={`${index}_answer_D`}
                        className="h-10 w-10 cursor-pointer place-content-center rounded-full border border-gray-200 bg-white p-3  font-bold text-indigo-900 hover:border-gray-600 hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white"
                      >
                        D
                      </label>
                      <div
                        id={`${index}_answer_D_content`}
                        contentEditable={true}
                        onInput={(event) => {
                          handleChange(event, index, 'D');
                        }}
                        onFocus={(event) => {
                          setonFocus(event.target.id), console.log(onFocus);
                        }}
                        className=" min-h-12 w-full border-none bg-white p-3 outline-none "
                      ></div>
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
    </>
  );
}
export default Quiz;
