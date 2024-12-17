import React,{useState} from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, 
  AlignCenter, AlignRight, Lock, AArrowDown, AArrowUp, Trash2
} from 'lucide-react';
import { DeleteNoteModal } from './DeleteNoteModal';
import { TbAnalyze } from "react-icons/tb";
import { MdSummarize } from "react-icons/md";


export const Toolbar = ({ onFormat, onAlignment, onAnalyze, onFontFormat,onSummarize}) => {

  const [deleteModal, setDeleteModal]=useState(null);

  return (
    <div className="flex justify-between border-b md:p-2 sm:p-1 md:gap-2 sm:gap-1">
      <div className='flex gap-2'>
      <button
        onClick={() => onFormat('bold')}
        className="md:p-2 sm:p-1 hover:bg-[#333333]  rounded"
      >
        <Bold className="h-4 w-4" />
      </button>

      <button
        onClick={() => onFormat('italic')}
        className="md:p-2 sm:p-1 hover:bg-[#333333]  rounded"
      >
        <Italic className="h-4 w-4" />
      </button>

      <button
        onClick={() => onFormat('underline')}
        className="md:p-2 sm:p-1 hover:bg-[#333333]  rounded"
      >
        <Underline className="h-4 w-4" />
      </button>

      <div className="border-r mx-2" />
      <button
        onClick={()=>onFontFormat("increase")}
        className="md:p-2 sm:p-1 hover:bg-[#333333] rounded"
      >
        <AArrowUp size={22}/>
      </button>

      <button
        onClick={()=>onFontFormat("decrease")}
        className="md:p-2 sm:p-1 hover:bg-[#333333] rounded"
      >
        <AArrowDown size={22}/>
      </button>

      <div className="border-r mx-2" />
      <button
        onClick={() => onAlignment('left')}
        className="md:p-2 sm:p-1 hover:bg-[#333333]  rounded"
      >
        <AlignLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => onAlignment('center')}
        className="md:p-2 sm:p-1 hover:bg-[#333333]  rounded"
      >
        <AlignCenter className="h-4 w-4" />
      </button>
      <button
        onClick={() => onAlignment('right')}
        className="md:p-2 sm:p-1 hover:bg-[#333333]  rounded"
      >
        <AlignRight className="h-4 w-4" />
      </button>
      
      <div className="border-r mx-2 " />

      <button
        onClick={()=>onAnalyze()}
        className="md:p-2 sm:p-1 hover:bg-[#333333] rounded"
        title='Highlights Important Terms'
      >
        <TbAnalyze size={22} />
      </button>

      <button
        onClick={()=>onSummarize()}
        className="md:p-2 sm:p-1 hover:bg-[#333333] rounded"
        title='Summarize'
      >
        <MdSummarize size={22} />
      </button>

      </div>

      <button
        onClick={()=>{setDeleteModal(true)}}
        className="md:p-2 sm:p-1 hover:bg-[#333333] rounded"
      >
        <Trash2 className="text-red-700" size={24} />
      </button>

      {deleteModal && <DeleteNoteModal setDeleteModal={setDeleteModal}/>}
    </div>
  );
};
