'use client';

import DropdownSearch from 'components/dropdown';

const Content = () => {
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
            Giáo án{' '}
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
      <div className="flex-auto bg-white px-5 py-7 place-items-center grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        <div className='w-64 h-28 flex flex-col bg-gray-100 p-2 rounded-md'>
          <div className='w-full h-8 bg-gray-100 flex justify-center overflow-hidden font-medium text-[18px] text-navy-700'>Đề kiểm tra toán giữa kì lớp 12A8</div>
          <div className='w-full flex-auto'>
            <div className='w-1/3 h-full'></div>
            <div className='w-2/3 h-full'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
