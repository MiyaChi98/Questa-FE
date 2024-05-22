import React, { useEffect } from 'react';
import Card from 'components/card';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import DeleteIcon from 'components/icons/DeleteIcon';
import useApi from 'app/hooks/useApi';
import Pop_Up_Assignment from './Pop_Up_Assignment';
import UpArrow from 'components/icons/UpArrow';
import DownArrow from 'components/icons/DownArrow';
import { HiDownload } from 'react-icons/hi';
import Download from 'components/icons/DashCurveDown';

type RowObj = {
  _id: string;
  name: string;
  email: string;
  mark: number;
  violations: number;
};

function SubmitTable(props: {
  courseID;
  tableData: any;
  currentPage: string;
  setCurrentPage;
}) {
  const { courseID, tableData, currentPage, setCurrentPage } = props;
  const api = useApi();
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <div className="flex items-center">
          {/* <Checkbox/> */}
          <p className="ml-3 text-sm font-bold text-white dark:text-white">
            TÊN
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
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <p className="text-sm font-bold text-white dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <div className="place-justify-center flex flex-row place-items-center">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('mark', {
      id: 'mark',
      header: () => (
        <p className="text-sm font-bold text-white dark:text-white">ĐIỂM</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue().toFixed(2)}
        </p>
      ),
    }),
    columnHelper.accessor('violations', {
      id: 'violations',
      header: () => (
        <p className="text-sm font-bold text-white dark:text-white">VI PHẠM</p>
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
        <div className="flex w-full justify-center">
          <p className="text-sm font-bold text-white dark:text-white">
            KẾT QUẢ HỌC TẬP CHI TIẾT
          </p>
        </div>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState([]);
  const [popUpDisplay, setPopUpDisplay] = React.useState(false);
  useEffect(() => {
    setData(tableData);
    console.log(tableData);
    let children = document.querySelectorAll<HTMLInputElement>('.children');
    for (var i = 0; i < children.length; i++) {
      children[i].checked = false;
    }
  }, [tableData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });
  return (
    <div className="mt-5">
      <Card extra={'w-full h-full sm:overflow-auto'} bgColor={'bg-white'}>
        <header className="relative flex items-center justify-between pt-4"></header>

        <div className="flex flex-col gap-3 overflow-x-scroll xl:overflow-x-hidden">
          <div className="w-full flex flex-row justify-between ">
            <p className="text-[20px] font-medium text-navy-700">Bảng điểm</p>
            <button
            className='flex flex-row gap-1 border text-blue-700 justify-center items-center p-2 rounded-md border-blue-700'>
                <Download/>
                Xuất bảng điểm
            </button>
          </div>

          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px rounded-md !border-gray-400 bg-blue-700"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="w-fit cursor-pointer border-b border-gray-200 pb-2 pt-4 text-start"
                      >
                        <div className="flex flex-row items-center text-xs text-white ">
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
              {table.getRowModel().rows.map((row) => {
                // console.log('row _id value');
                // console.log(row.getValue('_id'));
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      if (cell.column.id === '_id') {
                        const id: string = cell.getValue().toString();
                        return (
                          <td className="border-white/0 text-gray-900">
                            <button
                              onClick={() => {
                                // setFormdisplay(true)
                                // setDataID(id)
                              }}
                              className="flex w-full justify-center text-blue-400 hover:text-blue-900"
                            >
                              View
                            </button>
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={cell.id}
                            className="min-w-[150px] border-white/0 py-3 pr-4"
                          >
                            <div className="flex flex-row items-center text-xs text-gray-200 ">
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

export default SubmitTable;
const columnHelper = createColumnHelper<RowObj>();
