'use client';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import useApi from 'app/hooks/useApi';
import Button from 'components/button/button';
import { toast } from 'react-toastify';
import CheckTables from 'components/teacher/CheckTables';
import PlusIcon from 'components/icons/PlusIcon';
import SmallPlusIcon from 'components/icons/SmallPlusIcon';


const Assignment = () => {
  const api = useApi();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = React.useState(
    searchParams.get('page') ?? '1',
  );
  const [TableData, setTableData] = React.useState([]);
  // const [currentTableData, setcurrentTableData] = React.useState([]);
  const [pageNumbers, setPageNumbers] = React.useState([1]);
  // const [formDisplay, setFormdisplay] = React.useState(false);
  function handleClick(page: number) {
    if(page===-1){
      const newPage = (parseInt(currentPage)-1)
      if(newPage >= 1){
        setCurrentPage(newPage.toString());
      }else{
        toast.error('The previous page does not exist');
      }
    }else if(page === 0){
      const newPage = (parseInt(currentPage)+1)
      if(newPage <= pageNumbers[pageNumbers.length - 1]){
        setCurrentPage(newPage.toString());
      }else{
        toast.error('The next page does not exist');
      }
    }else{
      setCurrentPage(page.toString());
    }
  }
  async function handlePage() {
    const res = await api.get(`exam/teacher/all?page=${currentPage}&limit=5`);
    console.log(res.data.data);
    setTableData(res.data.data.allExam);
    setPageNumbers(res.data.data.numberOfPage)
  }
  useEffect(() => {
    handlePage();
    const params = new URLSearchParams(searchParams);
    params.set('page', currentPage);
    replace(`${pathname}?${params.toString()}`);
  },
   [currentPage]
   );

  return (
    <div className="w-full h-full flex flex-col mt-5 justify-end px-20 bg-background-100">
      {/* <div className=' w-full h-full '></div> */}
      <div className="grid mb-3 justify-items-end">
        <button 
        className='min-w-[80px] place-contents-center place-items-center h-fit p-2 px-5 rounded-md text-white bg-brand-500 hover:bg-brand-700 shadow-lg'
        >
          <a 
        href="assignment/new"
        className='flex flex-row gap-2' 
        >
          <SmallPlusIcon/>
          Tạo đề thi
          </a>
        </button>
      </div>
      <CheckTables tableData={TableData} currentPage = {currentPage} setCurrentPage = {setCurrentPage} />
      <div className="mr-10 mb-5 mt-3 grid justify-items-end">
        <nav aria-label="Page navigation example"> 
          <ul className="list-style-none flex">
            <li onClick={() => handleClick(-1)}>
              <Button name="Previous" small={false} textcolor={'navy-700'} bg={''} />
            </li>
            {pageNumbers.map((page) => {
              return (
                <li onClick={() => handleClick(page)}>
                  <Button
                    name={page.toString()}
                    small={true}
                    focus={currentPage === page.toString()} textcolor={'navy-700'} bg={''}/>
                </li>
              );
            })}
            <li onClick={() => handleClick(0)}>
              <Button name="Next" small={false} textcolor={'navy-700'} bg={''} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Assignment;
