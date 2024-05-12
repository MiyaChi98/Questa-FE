import useApi from 'app/hooks/useApi';
import React, { useState, useRef, useEffect } from 'react';
import Countdown, { zeroPad} from 'react-countdown';
import { toast } from 'react-toastify';

const OtpInput = (props: {
    email: string;
    resetpassword: string;
    display: boolean;
    setOtpInput  
  }) => {
  const {email,display,setOtpInput} = props
  const api = useApi()
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [date, setDate] = useState(Date.now());
  const [currentNav, setcurrentNav] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numeric values
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  const checkEmpty = arr => {
    for (let item of arr) {
        if (!item) {
            return false;
        }
    }
    return true;
}
  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text/plain').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (!isNaN(pasteData[i])) {
        newOtp[i] = pasteData[i];
      }
    }
    setOtp(newOtp);
    inputRefs.current[0].focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };
  useEffect(()=>{
    display? setDate(Date.now()): null
  },[display])
  const verifyOTP =async ()=>{
    const res = await api.post('mail/verifyOTP',{
      email: email,
      OTP: otp.join("")
    })
    console.log(res)
    setOtpInput(false)
    res.data.status === 201?
    toast.success('Mật khẩu tạm thời đã được gửi về email của bạn')
    : null
  }
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setOtpInput(false)
      // return <Completionist />;
    } else {
      // Render a countdown
      return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    }
  };
  
  return (
    <div
    className={`${
      display ? '' : 'hidden'
    } flex h-full w-full items-center justify-center`}
  >
    <div
    className='w-1/3 h-1/3 rounded-md bg-white flex flex-col items-center justify-center gap-3 text-navy-700'
    onClick={(e) => {
        e.stopPropagation();
      }}
     onPaste={handlePaste}>
      <div className='w-full flex flex-row items-center justify-center px-6 py-7 text-brand-700'>
      <p className='text-[20px] font-bold'>OTP đã được gửi tới email của bạn </p>
      </div>
      <div className='w-full flex flex-row items-center justify-center gap-3 text-navy-700'>
      {otp.map((value, index) => (
        <input
        className='h-16 w-12 rounded-md text-[30px] font-bold flex items-center justify-center'
          key={index}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
      </div>
      <div className='w-full flex flex-row items-center justify-end p-4'>
      <div className='w-fit h-9 flex flex-row items-center justify-center text-blue-500 bg-white gap-2'>
        <Countdown date={date + 60000}  
        renderer={renderer}
        /> 
        <button 
        onClick={()=>{
          verifyOTP()
        }}
        className={`h-9 rounded-md flex items-center justify-center bg-blue-500 text-white p-2 hover:bg-blue-900 ${checkEmpty(otp)? '':'cursor-not-allowed opacity-50'}`}> Xác nhận </button>
      </div>
      </div>
    </div>
    </div>
  );
};

export default OtpInput;
