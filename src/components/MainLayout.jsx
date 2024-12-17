import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useNotes } from '../context/NotesProvider';
import { FaPlus } from "react-icons/fa6";

export const MainLayout = () => {
  
  const { createNote } = useNotes();
  return (
    <div className="relative flex min-h-screen bg-[#000000] text-white">
      <Sidebar />
      <div className="h-screen flex-1 overflow-auto  shadow-md">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>

        <div className='absolute flex  items-center justify-center h-12 w-12  rounded-full bg-orange-500 hover:bg-orange-600 cursor-pointer right-24 bottom-16 z-50 animate-bounce' onClick={createNote}> <FaPlus size={25}/></div>
      </div>
    </div>
  );
};
