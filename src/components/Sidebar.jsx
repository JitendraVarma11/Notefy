import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { NotesList } from './NotesList';
import { useNotes } from '../context/NotesProvider';
import { MdOutlineNoteAdd } from "react-icons/md";

export const Sidebar = () => {
  const location = useLocation();
  const { createNote } = useNotes();

  return (
    <div className="flex flex-col md:min-w-[250px] bg-richblack-800 border-r border-gray-500">
  <div className="p-4">
    <button
      onClick={createNote}
      className="w-full p-2 rounded bg-orange-500 text-white hover:bg-orange-600 mb-4 flex gap-1 items-center justify-center"
    >
      <div>New Note</div>
      <MdOutlineNoteAdd/>
    </button>
  </div>

  <div className="flex-1">
    <NotesList />
  </div>

  <div className="border-t border-gray-500">
    <Link
      to="/settings"
      className={`flex items-center gap-2 p-4 ${
        location.pathname === '/settings' ? 'bg-[#1E1E1E]' : ''
      }`}
    >
      <Settings className="w-5 h-5" />
      Settings
    </Link>
  </div>
</div>

  );
};