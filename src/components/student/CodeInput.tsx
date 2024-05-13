import useApi from 'app/hooks/useApi'
import InputField from 'components/fields/InputField'
import { NoRuleRegex } from 'constants/Regex/norule.regex'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const CodeInput = (props:{
    display: boolean,
    setDisplay,
    userId: string
}) => {
    const {display,setDisplay,userId} = props
    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const api = useApi();
      const onSubmit = async (data) => {
        try {
          const res = await api.post('course/addStudent',
        {
            courseCode: data.code,
            studentID: userId
        })
        setDisplay(false)
        window.location.reload()
        } catch (error) {
          console.log('run through here')
          console.log(error)
          toast.error(error.response.data.detail.message)
        }
       }
  return (
    <div
    className={`${display ? '' : 'hidden'
      } flex h-full w-full items-center justify-center`}
  >
    <div
      className=" border-slate-600 mb-[8vh] mt-[8vh] flex w-4/12 items-center justify-center rounded-2xl border-white px-16 py-7"
      style={{ backgroundColor: '#fff' }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="relative mb-[3vh] flex h-full w-full items-center justify-center px-2 ">
        {/* <button
          type="button"
          className="absolute top-0 right-2 mt-3 inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm font-semibold text-xl text-cyan-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
          onClick={() => {
            props.setDisplay(false)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button> */}
        <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h3 className="justify-end text-3xl font-bold uppercase text-navy-700 text-indigo-900">
            Nhập mã lớp
          </h3>
          {/* <p className="mb-9 ml-1 text-base text-white text-xl">
          Enter all the info 
        </p> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <InputField
              extra="mb-3"
              label=""
              label_color='indigo'
              placeholder="Mã lớp học"
              id="code"
              type="text"
              name="code"
              defaultValue={''}
              require={true}
              register={register}
              maxLength={50}
              minLength={1}
              pattern={NoRuleRegex}
            />
            <button
              className="linear w-full rounded-xl bg-cyan-300 py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="submit"
            >
              Tham gia lớp học
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CodeInput