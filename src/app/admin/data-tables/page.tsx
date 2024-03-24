'use client';
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import useApi from 'app/hooks/useApi';
import Button from 'components/button/button';
import { toast } from 'react-toastify';
import Form from 'components/admin/data-tables/Detail_Form';


const Tables = () => {
  const api = useApi();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = React.useState(searchParams.get('page') ?? '1');
  const [currentLimit, setCurrentLimit] = React.useState(5);
  const [currentTableData, setCurrentTableData] = React.useState([]);
  const [pageNumbers, setPageNumbers] = React.useState([1])
  const [formDisplay, setFormdisplay] =React.useState(false)
  function handleClick(page: number) {
    if(page===-1){
      const newPage = (parseInt(currentPage)-1)
      if(newPage >= 1){
        setCurrentPage(newPage.toString());
      }else{
        toast.error('The previos page does not exist'); 
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
    const res = await api.get(
      `user/all?page=${currentPage}&limit=${currentLimit}`,
    );
    setCurrentTableData(res.data.data.allUSer);
    setPageNumbers(res.data.data.numberOfPage)
  }
  useEffect(() => {
    handlePage();
    const params = new URLSearchParams(searchParams);
    params.set('page', currentPage);
    replace(`${pathname}?${params.toString()}`);
  }, [currentPage]);

  return (
      <div className="mt-10" >
      <div id={formDisplay? 'overlay' : ''}
      onClick = {()=>{setFormdisplay(false)}}
      > 
        <Form display={formDisplay} type={'create'} setFormdisplay={setFormdisplay}/>
      </div>
      <div className="mb-3 mt-3 mr-3 grid justify-items-end">
        <button 
        onClick={()=>{setFormdisplay(true)}}
        className='min-w-[80px] min-h-[50px] p-3 rounded-md bg-brand-700'
        >Add new user</button>
      </div>
        <ColumnsTable tableData={currentTableData} />
        <div className="mr-10 mt-3 grid justify-items-end">
        <nav aria-label="Page navigation example">
          <ul className="list-style-none flex">
            <li onClick={() =>handleClick(-1)}>
              <Button name="Previous" small={false} />
            </li>
            {pageNumbers.map(page=> {
              return( 
              <li onClick={() =>handleClick(page)}>
                <Button name={page.toString()} small={true} focus={currentPage === page.toString()} />
              </li>
              )
            })}
            <li onClick={() =>handleClick(0)}>
              <Button name="Next" small={false}  />
            </li>
          </ul>
        </nav>
      </div>
      </div>
  );
};

export default Tables;
