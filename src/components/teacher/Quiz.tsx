'use client';

import useApi from 'app/hooks/useApi';
import ImgIcon from 'components/icons/ImgIcon';
import AudioIcon from 'components/icons/VideoIcon';
import X from 'components/icons/Xicon';
import { useState } from 'react';
function Quiz(props: { 
  register;
   unregister;
   formFields;
   setFormFields
   }) {
  const { register, unregister,formFields,setFormFields } = props;
  const api = useApi();

  const handleChange = (event, index) => {
    let data = [...formFields];
    console.log(event.target.name)
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const handleFileInput = async (event,index:number ,name: string)=>{
    const file = event.target.files[0];
    console.log(file)
    const test = await api.get(`course/allcourse`);
    console.log(test)
    const res = await api.post(`quiz/upload/image`,
      {
        file:file
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log(res)
    try {
      let data = [...formFields];
      data[index][name] = res.data.data.s3Name;
      //pick the img or audio tag base on the name and index
      const preview = document.querySelector<HTMLSourceElement>(`${name}[id='${index}_${name}']`)
      console.log(preview)
      preview.src= res.data.data.imgUrl
      setFormFields(data);
    } catch (error) {
      console.log(error)
    }
  }

  const addFields = () => {
    let object = {
      question: '',
      img: '',
      audio: '',
      A: '',
      B: '',
      C: '',
      D: '',
      answer: 'A',
    }
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    console.log('before remove',...formFields)
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
    console.log('after remove',...data)
  };

  return (
    <div className="mt-3 h-full w-full p-3">
      {formFields.map((form, index) => {
        if(form===null){
          return 
        }
        return (
          <div key={index} className="w-full bg-gray-600/20 text-indigo-900">
            <div className="flex flex-row content-center justify-between">
              <p className="m-2 text-[20px] font-bold ">Câu {index + 1}:</p>
              <div className='flex flex-row'>
                {/* Image */}
              <label className='m-2 w-fit rounded-lg hover:bg-indigo-600 hover:text-white'>
                  <ImgIcon/>
                  <input  
                  name='img'
                  onChange={async (e)=>{
                    handleFileInput(e,index,'img')
                  }}
                  type="file" 
                  className="hidden"
                  accept="image/png, image/jpeg"
                  />
                  </label >
                  {/* Audio */}
                  <label className='m-2 w-fit rounded-lg hover:bg-indigo-600 hover:text-white'>
                  <AudioIcon/>
                  <input  
                  name='audio'
                  onChange={async (e)=>{
                    handleFileInput(e,index,'audio')
                  }}
                  type="file" 
                  className="hidden"
                  accept="audio/*"
                  />
                  </label>
                <button
                  className='m-2 w-fit rounded-lg hover:bg-indigo-600 hover:text-white'
                  type='button'
                  onClick={() => {
                    console.log('index',index)
                    removeFields(index) 
                  }}
                >
                  <X />
                </button>
              </div>
            </div>
            <hr className='h-0.5 bg-gray-500	'/>
            <div className="flex w-full h-full flex-col p-2 gap-2">
              <div className='flex flex-col gap-2 place-content-center'>
              <textarea
                name='question'
                onChange={event => handleChange(event, index)}
                rows={4}
                className="block w-full border-none p-2.5 text-gray-900"
                placeholder="Nội dung câu hỏi"
                value={form.question}
                required
              ></textarea> 
              <img 
              id={`${index}_img`}
              src=''
              className={`${form.img? '':'hidden'} h-56 w-full object-scale-down`}
              />
              <audio 
              id={`${index}_audio`}
              controls 
              controlsList="nodownload"
              className={`${form.audio? '':'hidden'} border rounded-full border-indigo-900`}>
              </audio>
              </div>
              
              <div className="flex w-full flex-row justify-between ">
                <div className="m-3 w-1/2 flex flex-col gap-5">
                  <div className='A flex flex-row gap-2'> 
                    <p className='m-2 text-[20px] font-bold text-indigo-900'>
                      A.
                    </p>
                    <input type="text"
                    required
                    name='A'
                    onChange={event => handleChange(event, index)}
                    value={form.A}
                    className='flex h-12 w-full items-center justify-center  border-none bg-white p-3 outline-none ' />
                  </div>
                  <div className='C flex flex-row gap-2'> 
                    <p className='m-2 text-[20px] font-bold text-indigo-900'>
                      C.
                    </p>
                    <input type="text"
                    name='C'
                    onChange={event => handleChange(event, index)}
                    value={form.C}
                    className='flex h-12 w-full items-center justify-center  border-none bg-white p-3 outline-none ' />
                  </div>
                </div>
                <div className="m-3 w-1/2 flex flex-col gap-5">
                  <div className='B flex flex-row gap-2'> 
                    <p className='m-2 text-[20px] font-bold text-indigo-900'>
                      B.
                    </p>
                    <input type="text"
                    required
                    name='B'
                    onChange={event => handleChange(event, index)}
                    value={form.B}
                    className='flex h-12 w-full items-center justify-center  border-none bg-white p-3 outline-none ' />
                  </div>
                  <div className='D flex flex-row gap-2'> 
                    <p className='m-2 text-[20px] font-bold text-indigo-900'>
                      D.
                    </p>
                    <input type="text"
                    name='D'
                    onChange={event => handleChange(event, index)}
                    value={form.D}
                    className='flex h-12 w-full items-center justify-center  border-none bg-white p-3 outline-none ' />
                  </div>
                </div>
                </div>
            </div>
          </div>
        );
      })}
      <button 
      className="bg-gray-600" 
      onClick={addFields}>
        Add More..
      </button>
    </div>
  );
}
export default Quiz;
