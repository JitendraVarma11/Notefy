import React from 'react'
import { useNotes } from '../context/NotesProvider';

export const DeleteNoteModal = ({setDeleteModal}) => {

const {deleteNote,selectedNote } = useNotes();

  const handleDeleteNote = () => {
    if (selectedNote) {
      deleteNote(selectedNote.id);
    }
  };
  const handleCloseMadal=()=>{
    setDeleteModal(false);
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-fit rounded-lg border bg-gray-500 bg-opacity-20 p-6">
        <p className="text-2xl font-semibold">
          Do you want to delete this note?
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
        This action will permanently delete your note
        </p>
        <div className="flex items-center gap-x-4">
          <button
            onClick={handleCloseMadal}
          > <div className="flex gap-2 items-center justify-center bg- text-black bg-white py-2 px-4 font-bold rounded-md">Cancel</div></button>
          <button
            className="cursor-pointer rounded-md bg- py-[8px] px-[20px] font-semibold bg-orange-500 text-richblack-900"
            onClick={handleDeleteNote}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
