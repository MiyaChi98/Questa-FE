import React, { useEffect } from 'react';
import Card from 'components/card';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import ChangeDetail from 'components/icons/ChangeDetail';
import DeleteIcon from 'components/icons/DeleteIcon';
import useApi from 'app/hooks/useApi';
import Pop_Up_Assignment from './Pop_Up_Assignment';
import DropdownSearch from 'components/dropdown';

type RowObj = {
  check: any;
  _id: string;
  name: [string, boolean];
  course: string;
  subject: string;
  submition: number;
  avgScore: any;
  last_update: boolean;
};

function CheckTable(props: { 
  tableData: any,
  currentPage: string,
  setCurrentPage
}) {
  const { tableData, currentPage, setCurrentPage } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const api = useApi();
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <div className="flex items-center">
          {/* <Checkbox/> */}
          <p className="ml-3 text-sm font-bold text-brand-800 dark:text-white">
            ĐỀ THI
          </p>
        </div>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          {/* <Checkbox/> */}
          <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('course', {
      id: 'course',
      header: () => (
        <p className="text-sm font-bold text-brand-800 dark:text-white">
          LỚP
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('subject', {
      id: 'subject',
      header: () => (
        <p className="text-sm font-bold text-brand-800 dark:text-white">
          MÔN HỌC 
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('submition', {
      id: 'submition',
      header: () => (
        <p className="text-sm font-bold text-brand-800 dark:text-white">
          SỐ BÀI NỘP 
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('avgScore', {
      id: 'avgScore',
      header: () => (
        <p className="text-sm font-bold text-brand-800 dark:text-white">
          ĐIỂM TB
        </p>
      ),
      cell: (info) => (
        <p className={`text-sm font-bold text-navy-700 dark:text-white ${parseInt(info.getValue())>5?'text-green-700':'text-red-500'}`}>
          {/* ${info.getValue() === 'Không có dữ liệu' ? 'text-gray-500':''} */}
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('last_update', {
      id: 'last_update',
      header: () => (
        <p className="text-sm font-bold text-brand-800 dark:text-white">
          LẦN CẬP NHẬT CUỐI 
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('_id', {
      id: '_id',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Xem chi tiết</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const [popUpDisplay, setPopUpDisplay] =React.useState(false)
  const handleCheckBoxClick = () => {
    let children = document.querySelectorAll<HTMLInputElement>('.children');
    let parent = document.querySelector<HTMLInputElement>('.parent');
    console.log(parent.checked);
    console.log(children);
      for (var i = 0; i < children.length; i++) {
        children[i].checked = true;
      }
    if ((parent.checked === false)) {
      for (var i = 0; i < children.length; i++) {
        children[i].checked = false;
      }
    }
  };
  const handleDelete = async () => {
    const allChecked = document.querySelectorAll<HTMLInputElement>('.children');
    const parent = document.querySelector<HTMLInputElement>('.parent');
    const item = []
    for (var i = 0; i < allChecked.length; i++) {
      if(allChecked[i].checked === true) {
        const res = await api.delete(`exam/${allChecked[i].value}`)
        console.log(res)
        console.log(i,allChecked[i].checked,allChecked[i].value)
      }
    }
    if(parent.checked=== true&& (parseInt(currentPage)>1)){
      parent.checked = false
      setCurrentPage((parseInt(currentPage)-1).toString())
    }else window.location.reload()
  }
  useEffect(() => {
    console.log(defaultData)
    setData([...defaultData]);
    let children = document.querySelectorAll<HTMLInputElement>('.children');
    for (var i = 0; i < children.length; i++) {
      children[i].checked = false;
    }
  }, [defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <div className=''>
    <div id={popUpDisplay? 'overlay' : ''}
      onClick = {()=>{setPopUpDisplay(false)}}
      > 
        <Pop_Up_Assignment display={popUpDisplay} setPopUpDisplay={setPopUpDisplay} handleDelete={handleDelete}/>
    </div>
    <Card extra={'w-full h-full sm:overflow-auto px-10'} bgColor = {'bg-white'}>
      <header className="relative flex items-center justify-between pt-4">
      <DropdownSearch
          type='exam'
          />
        <button 
        onClick={()=>{
          setPopUpDisplay(true)
        }
      }
        className='p-2 rounded-md bg-gray-700 flex flex-row gap-3 hover:bg-red-500'
        >
          <DeleteIcon />
        </button>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                    >
                      <div className="flex flex-row items-center text-xs text-gray-200 ">
                        {header.id === 'name' ? (
                          <input
                            type="checkbox"
                            // id='parent-checkbox'
                            className={`parent relative ml-1 flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded border-brand-300 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500 `}
                            onClick={() => {handleCheckBoxClick()}}
                          />
                        ) : (
                          ''
                        )}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table
              .getRowModel()
              .rows
              .map((row) => {
                // console.log('row _id value');
                // console.log(row.getValue('_id'));
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      if (cell.column.id === '_id') {
                        const id: string = cell.getValue().toString();
                        return (
                          <>
                            <td className="min-w-[30px] border-white/0 flex flex-row gap-3 py-3 pr-4 text-brand-600 ">
                            <a href={`assignment/detail/?examId=${id}`}>View detail</a>
                              <button
                                onClick={() => {
                                  // setFormdisplay(true)
                                  // setDataID(id)
                                }}
                              >
                                <ChangeDetail />
                              </button>
                            </td>
                          </>
                        );
                      } else {
                        return (
                          <td
                            key={cell.id}
                            className="min-w-[150px] border-white/0 py-3 pr-4"
                          >
                            <div className="flex flex-row items-center text-xs text-gray-200 ">
                              {cell.column.id === 'name' ? (
                                <input
                                  type="checkbox"
                                  name="children"
                                  value={row.getValue('_id')}
                                  className={`children relative ml-1 flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded border-brand-300 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500 `}
                                  onClick={() => {
                                    let parent = document.querySelector<HTMLInputElement>('.parent');
                                    parent.checked = false
                                  }}
                                />
                              ) : (
                                ''
                              )}
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </div>
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );
}

export default CheckTable;
const columnHelper = createColumnHelper<RowObj>();
