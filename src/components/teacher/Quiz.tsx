'use client';

import { Data_Type } from 'app/teacher/assignment/new/page';
import InputField from 'components/fields/InputField';
import { NameRegex } from 'constants/Regex/name.regex';
import { useFieldArray } from 'react-hook-form';
function Quiz(
  props: { 
    register,
   
  }
  ) {
  const { 
    register,
   
  } = props;
  return(
    <div className='w-full h-full mt-3 p-3'>
      <div className='w-full h-2/5 bg-gray-600/20'>
      </div>
    </div>
  )
}
export default Quiz;
