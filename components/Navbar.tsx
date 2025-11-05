import { Bell } from 'lucide-react';
import React from 'react';

const Navbar = () => {
  return (
    <div className='bg-white w-full shadow-lg rounded-2xl flex justify-between py-2 px-4 items-center sticky top-0 z-50 border-2 border-slate-300'>
      <h1 className='text-2xl font'>Gift Suggestion</h1>  
      <div className='flex gap-4 items-center'>
        <div className='relative'>
      <Bell className='hover:cursor-pointer'/>
      <div className='bg-red-500 rounded-full text-xs flex items-center justify-center w-4 h-4 absolute -right-1 -top-2'>0</div>
        </div>
      <div className='text-center text-sm'>
        <h1 className='font-semibold text-lg'>John Doe</h1>
        <h1 className='text-slate-500'>Admin</h1>
      </div>
      <div className='rounded-full w-10 h-10 flex justify-center items-center bg-amber-200 hover:cursor-pointer'>
        J
      </div>
      </div>
    </div>
  );
}

export default Navbar;
