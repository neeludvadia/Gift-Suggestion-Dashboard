"use client"
import { Bell, Menu } from 'lucide-react';
import React, { useState } from 'react';
import AddCustomerDialog from './AddCustomerDialog';
import BulkUploadDialog from './BulkUploadDialog';

const Navbar = () => {

  const [isOpen,setIsOpen] = useState<boolean>(false);

  return (
    <div className='bg-white w-full shadow-lg rounded-2xl flex justify-between py-2 px-4 items-center sticky top-0 z-50 border-2 border-slate-300'>
      {/* <h1 className='text-2xl font'>Gift Suggestion</h1>   */}
      {/* Left section */}
      <h1 className="text-xl sm:text-2xl font-semibold truncate">
        Gift Suggestion
      </h1>
      <div className='flex gap-4 items-center'>
        {/* <div className='relative'>
      <Bell className='hover:cursor-pointer'/>
      <div className='bg-red-500 rounded-full text-xs flex items-center justify-center w-4 h-4 absolute -right-1 -top-2'>0</div>
        </div> */}
        <div className="relative hidden sm:block">
          <Bell className="hover:cursor-pointer text-gray-700" size={22} />
          <div className="bg-red-500 rounded-full text-[10px] flex items-center justify-center w-4 h-4 absolute -right-1 -top-1">
            0
          </div>
        </div>


      {/* <div className='text-center text-sm'>
        <h1 className='font-semibold text-lg'>John Doe</h1>
        <h1 className='text-slate-500'>Admin</h1>
      </div> */}

      {/* User info — hide text on mobile */}
        <div className="hidden sm:flex flex-col text-right text-sm">
          <h1 className="font-semibold text-base">John Doe</h1>
          <h1 className="text-slate-500">Admin</h1>
        </div>

      {/* <div className='rounded-full w-10 h-10 flex justify-center items-center bg-amber-200 hover:cursor-pointer'>
        J
      </div> */}

        {/* Profile avatar */}
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-amber-200 hover:cursor-pointer">
          J
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex items-center justify-center ml-2 p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={22} />
        </button>

      </div>

        {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-4 top-14 bg-white shadow-lg border rounded-xl p-3 w-40 flex flex-col gap-2 sm:hidden animate-fade-in">
          <button className="text-sm text-gray-700 hover:bg-gray-100 rounded-md px-2 py-1 text-left">
            Notifications
          </button>
          <button className="text-sm text-gray-700 hover:bg-gray-100 rounded-md px-2 py-1 text-left">
            Profile
          </button>
          <button className="text-sm text-gray-700 hover:bg-gray-100 rounded-md px-2 py-1 text-left">
            Logout
          </button>
          <AddCustomerDialog/>
          <BulkUploadDialog/>
        </div>
      )}

    </div>
  );
}

export default Navbar;
