import useApi from 'app/hooks/useApi';
import React, { useEffect, useState } from 'react';
import { BsExclamationLg } from 'react-icons/bs';

const SubmitPopUp = (props: {
  display;
  setDisplay;
  submitData;
  examId: string;
  violations: number;
}) => {
  const { display, setDisplay, submitData, examId, violations } = props;
  const api = useApi();
  const [unDone, setUnDone] = useState(0);
  const handlePage = () => {
    let numberofUnDoneQuiz = 0;
    for (const form of submitData) {
      console.log(form.answer);
      if (!form.answer) {
        numberofUnDoneQuiz++;
      }
    }
    console.log(submitData);
    setUnDone(numberofUnDoneQuiz);
  };
  const onSubmit = async () => {
    try {
      const res = await api.post('submit', {
        examId: examId,
        violations: violations,
        submitAnswer: {
          array: submitData,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    display ? handlePage() : null;
  }, [display]);
  return (
    <div
      className={`${
        display ? '' : 'hidden'
      } flex h-full w-full items-center justify-center`}
    >
      <div
        className="border-slate-600 mb-[8vh] mt-[8vh] flex w-4/12 items-center justify-center rounded-2xl border-white px-16 py-7"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {unDone ? (
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base text-xl font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Bạn chưa hoàn thành bài thi
                  </h3>
                  <div className="mt-2">
                    <p className="text-xl text-gray-500">
                      Hệ thống phát hiện bạn vẫn còn {unDone} câu hỏi chưa hoàn
                      thiện.{' '}
                    </p>
                    <p className="text-xl text-gray-500">
                      Hãy xác nhận nếu bạn muốn nộp bài.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-black sm:mx-0 sm:h-10 sm:w-10">
                  <BsExclamationLg className='w-8 h-8'/>
                </div>
                <div className="mt-3 text-center items-center justify-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base text-xl font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Vẫn còn thời gian
                  </h3>
                  <div className="mt-2">
                    <p className="text-xl text-gray-500">
                      Hãy kiểm tra lại bài làm
                    </p>
                    <p className="text-xl text-gray-500">
                      Hãy xác nhận nếu bạn muốn nộp bài.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              onClick={() => {
                onSubmit();
                setDisplay(false);
              }}
              type="button"
              className="bg-red mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPopUp;
