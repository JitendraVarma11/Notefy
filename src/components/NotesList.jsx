import React from 'react';
import { Pin, Lock } from 'lucide-react';
import { useNotes } from '../context/NotesProvider';
import { Link } from 'react-router-dom';

export const NotesList = () => {
  const { notes, selectedNote, setSelectedNote, togglePin } = useNotes();

  const renderNote = (note) => (
    <div
      key={note.id}
      onClick={() => setSelectedNote(note)}
      className={`p-3 mb-2 mx-2 border-black rounded cursor-pointer ${
        selectedNote?.id === note.id ? 'bg-[#4D4D4D] ' : 'bg-[#1E1E1E]'
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{note?.title?.length > 20 ? note.title.substring(0,20)+"..." : note.title}

</h3>
        <div className="flex gap-2">
          <Pin
            className={`h-4 w-4 cursor-pointer ${
              note.pinned ? 'text-white' : 'text-gray-300 hover:text-blue-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              togglePin(note.id);
            }}
          />
        </div>
      </div>
      <p className="text-sm text-gray-200 mt-1">
      {new Date(note.lastModified).toLocaleDateString()}  {new Date(note.lastModified).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
      </p>
    </div>
  );

  const pinnedNotes = notes.filter(note => note.pinned);
  const unpinnedNotes = notes.filter(note => !note.pinned);

  return (
    <div className="flex-1 overflow-y-scroll custom-scrollbar h-[500px]">
      {pinnedNotes.length > 0 && (
        <div className="mb-4">
          <div className="px-4 py-2 text-sm font-medium text-gray-200">
            {`Pinned Notes(${pinnedNotes.length})`}
          </div>
          {pinnedNotes.map(renderNote)}
        </div>
      )}
      <div>
        <div className="px-4 py-2 text-sm font-bold text-gray-200">
           {`All Notes (${unpinnedNotes.length})`}
        </div>
        {unpinnedNotes.map(renderNote)}
      </div>
    </div>
  );
};