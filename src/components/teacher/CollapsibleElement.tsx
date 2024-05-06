import ChevronDown from 'components/icons/ChevronDown';
import ChevronRight from 'components/icons/ChevronRight';
import { useState } from 'react';

const CollapsibleElement = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border rounded-xl rounded-ee-none rounded-es-none bg-white shadow-lg">
      <div
        className="flex justify-between px-4 py-2 cursor-pointer border rounded-xl rounded-ee-none rounded-es-none bg-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='text-[20px]'>{title}</div>
        <div>{isOpen ?  <ChevronDown/>:<ChevronRight/>}</div>
      </div>
      {isOpen && (
        <div className="p-3 grid grid-cols-5">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleElement;
