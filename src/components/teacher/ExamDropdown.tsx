import ChevronDown from 'components/icons/ChevronDown';
import ChevronRight from 'components/icons/ChevronRight';
import { useState } from 'react';

const ExamDropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className=" rounded-xl rounded-ee-none rounded-es-none">
      <div
        className="flex flex-row place-items-center px-4 py-2 cursor-pointer rounded-xl rounded-ee-none rounded-es-none shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{isOpen ?  <ChevronDown/>:<ChevronRight/>}</div>
        <div className='ml-3 text-[20px] font-bold text-brand-700'>{title}</div>
      </div>
      {isOpen && (
        <div className="mt-2 pl-4 flex flex-col flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExamDropdown;
