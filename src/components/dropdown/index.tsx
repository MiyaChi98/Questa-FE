'use client';

import useApi from 'app/hooks/useApi';
import React, { useState, useRef, useEffect } from 'react';

const DropdownSearch = (
  props:{
    type: string
  }
) => {
  const {type} = props;
  const api = useApi();
  // const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const wrapperRef = useRef(null);

  // Function to filter items based on the search query
  // const filteredItems = items.filter(item =>
  //   item.toLowerCase().startsWith(search.toLowerCase())
  // );

  const handleChange = async (value: string) => {
    const searchValue = await api.get(
      `search/searchBy${type}Name?${type}Name=${value}`,
    );
    console.log(searchValue);
    setItems(searchValue.data.data);
  };

  const handleClick = (courseId) => {
    console.log(courseId);
  };

  // Function to handle clicks outside of the dropdown to close it
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        onClick={() => setOpen(!open)}
        type="search"
        // value={search}
        onChange={
          (e) => {
            handleChange(e.target.value);
          }
          // setSearch(e.target.value)
        }
        placeholder="Search Here..."
        className="min-w-72 rounded-md border border-gray-300 px-4 py-2 pr-10 text-navy-700 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-400"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      {open && (
        <ul
          className="absolute z-10 mt-1 min-w-72 max-h-48 overflow:scroll rounded border border-blue-500 bg-white shadow-lg"
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          {type==='course'&&items.map((item, index) => (
            <li
              key={index}
              onClick={(e) => {
                handleClick(item.courseId);
              }}
              className="w-full cursor-pointer p-4 text-navy-700 hover:bg-gray-100"
            >
              <a 
              href={`class/id/?courseId=${item.courseId}`}
              className="w-full h-full"
              >{item.courseName}
              </a>
            </li>
          ))}
          {type==='exam'&&items.map((item, index) => (
            <li
              key={index}
              // onClick={(e) => {
              //   handleClick(item.examId);
              // }}
              className="w-full cursor-pointer p-4 text-navy-700 hover:bg-gray-100"
            >
              <a 
              // href={`class/id/?courseId=${item.courseId}`}
              href='#'
              className="w-full h-full"
              >{item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSearch;
