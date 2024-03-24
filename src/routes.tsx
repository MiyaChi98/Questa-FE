import React from 'react';
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdLibraryBooks,
  MdClass,
  MdAddTask,
  MdAssignmentAdd,
} from 'react-icons/md';

export const admin = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'data-tables',
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
  }
];
export const teacher = [
  {
    name: 'Home',
    layout: '/teacher',
    path: 'home',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Assignment',
    layout: '/teacher',
    icon: <MdAssignmentAdd className="h-6 w-6" />,
    path: 'assignment',
  },
  {
    name: 'Class',
    layout: '/teacher',
    icon: <MdClass className="h-6 w-6" />,
    path: 'class',
  },
  {
    name: 'Content',
    layout: '/teacher',
    icon: <MdLibraryBooks className="h-6 w-6" />,
    path: 'content',
  },
  {
    name: 'Profile',
    layout: '/teacher',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  }
]

