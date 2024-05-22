'use client';

import useApi from 'app/hooks/useApi';
import Button from 'components/button/button';
import DropdownSearch from 'components/dropdown';
import Exam from 'components/icons/Exam';
import PowerPoint from 'components/icons/PowerPoint';
import Word from 'components/icons/Word';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Content = () => {
  const api = useApi();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ?? '1',
  );
  const [TableData, setTableData] = useState([]);
  // const [currentTableData, setcurrentTableData] = React.useState([]);
  const [pageNumbers, setPageNumbers] = useState([1]);
  // const [formDisplay, setFormdisplay] = React.useState(false);
  const formatDate = (uploadDate) => {
    if(uploadDate){
      const date = new Date(uploadDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero based, so we add 1
    const year = date.getFullYear();
  
    // Padding with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
    } else {
      return 'Không dữ liệu'
    }
  };
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
    const res = await api.get(`search`);
    console.log(res.data.data);
    const allContent = res.data.data.hits.hits
    setTableData(
    allContent.slice(
        (parseInt(currentPage) - 1) * 5,
        parseInt(currentPage) * 5,
      ),
    );
    const numberOfPage = Array.from(
      { length: Math.ceil(allContent.data.data.length / 12) },
      (_, i) => i + 1,
    );
    await setPageNumbers(numberOfPage);
    console.log(res.data.data)
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
    <div className="h-full w-full flex-col px-10 py-5">
      <div className="flex h-20 flex-row items-center gap-5 rounded-se-md rounded-ss-md bg-gray-700 px-2">
        <DropdownSearch type="course" />
        <select
          id="type"
          // onChange={onChange}
          className="w-48 appearance-none rounded-md border bg-white p-2 text-indigo-900 shadow-sm outline-none focus:border-indigo-600"
        >
          <option value="">Tất cả tài liệu</option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Đề thi
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Giáo án
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Bài giảng
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Tài liệu hướng dẫn
          </option>
        </select>
        <select
          id="subject"
          // onChange={onChange}
          className="w-48 appearance-none rounded-md border bg-white p-2 text-indigo-900 shadow-sm outline-none focus:border-indigo-600"
        >
          <option value="">Tất cả môn học</option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Toán
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Tiếng Anh
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Hóa học
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Sinh học
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Vật lý
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Địa lý
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Lịch sử
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Tin học
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Giáo dục công dân
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Giáo dục quốc phòng & an ninh
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Âm nhạc
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Mĩ thuật
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Công nghệ
          </option>
        </select>
        <select
          id="grade"
          className="w-48 appearance-none rounded-md border bg-white p-2 text-indigo-900 shadow-sm outline-none focus:border-indigo-600"
        >
          <option value="">Tất cả khối</option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 1
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 2
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 3
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 4
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 5
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 6
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 7
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 8
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 9
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 10
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 11
          </option>
          <option className="appearance-none rounded-md border bg-white p-2.5 text-indigo-900 shadow-sm outline-none focus:border-indigo-600">
            Khối 12
          </option>
        </select>
      </div>
      <div className="flex-auto bg-white px-5 py-7 place-items-center grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {TableData.map((data)=>{
          return (
          <a 
          href={data._source.fileUrl}
          className='w-64 h-28 flex flex-col border bg-gray-100 p-2 rounded-md cursor-pointer'>
          <span 
          title={data._source.fileName}
          className='block overflow-hidden whitespace-nowrap text-ellipsis p-1 text-[18px] text-navy-900'>{data._source.fileName}</span>
            <hr className='h-0.5 bg-gray-300'/>
            <div className='h-fit flex flex-row place-items-center items-center text-[13px] text-navy-900 gap-5'>
              {data._source.fileType==='word'?
              <Word/>
              : data._source.fileType==='powerpoint'?
              <PowerPoint/>
              : data._source.type === 'Đề thi'?
              <Exam/>
              : 'unknown'
            }
              <div className='flex flex-col pt-1'>
              <span>Khối {data._source.grade} - {data._source.subject}</span>
              <span>Cập nhật: {formatDate(data._source.uploadDate)}</span>
              <span className='block overflow-hidden whitespace-nowrap text-ellipsis'>Loại tài liệu: {
              data._source.type==='Tài liệu hướng dẫn'?
              'TL hướng dẫn'
              : data._source.type
              } </span>
            </div>
          </div>
        </a>
          )
        })}
      </div>
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

export default Content;
