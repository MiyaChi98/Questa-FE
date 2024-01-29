'use client';
import React, { useEffect } from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import Button from 'components/button/button';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Role } from 'constants/Enum/role.enum';
import tableDataColumns from 'variables/data-tables/tableDataColumns';
import Link from 'next/link';
import ChangeDetail from 'components/icons/ChangeDetail';
import Form from './Detail_Form';

type RowObj = {
  email: string;
  name: string;
  phone: string;
  zone: Role;
};

function ColumnsTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PHONE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('zone', {
      id: 'zone',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ZONE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  useEffect(()=>{
    setData([...defaultData])
  },[defaultData])
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
    <div>
      <Form/>
      <Card extra={'w-full pb-10 p-4 h-full'}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 ">
            User Data List
          </div>
          <CardMenu />
        </header>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="h-full w-full">
            <thead className='cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start"
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
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
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 10)
                .map((row) => {
                  return (
                    <tr
                      style={{
                        height: '70px',
                      }}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="min-w-[150px] border-white/0 py-3 pr-4 "
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        );
                      })}
                      <td
                      className='min-w-[70px] border-white/0 py-3 pr-4 text-brand-600 '
                      > 
                      <Link href={'/'} > View details</Link>
                      </td>
                      <td
                      className='min-w-[30px] border-white/0 py-3 pr-4 text-brand-600 '
                      > 
                      <button >
                      <ChangeDetail/>
                      </button>
                      
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="flex overflow-x-auto sm:justify-center"></div>
      </Card>
    </div>
  );
}

export default ColumnsTable;
const columnHelper = createColumnHelper<RowObj>();
