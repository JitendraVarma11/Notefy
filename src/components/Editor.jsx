import React, { useEffect, useState,useCallback } from 'react';
import { Toolbar } from './Toolbar';
import { useNotes } from '../context/NotesProvider';
import { extractKeyTerms, getSummary } from '../api/apiHandler';
import { Tooltip } from 'react-tooltip';

export const Editor = () => {
  const { selectedNote, updateNote, deleteNote, updateTitle } = useNotes();

  const [keyTerms, setKeyTerms] = useState([]);

  // Handle case where no note is selected
  if (!selectedNote) {
    return (
      <div className="flex-1 flex items-center font-medium justify-center text-gray-400">
        Select a note or create a new one
      </div>
    );
  }

  const highlightTerms = (text, terms) => {
    if (!text || terms.length === 0) return text;
  
    let highlightedText = text;
  
    terms.forEach(({ term, description },index) => {
      console.log("description: ",description);
      const regex = new RegExp(`(${term})`,'gi');
      highlightedText = highlightedText.replace(regex, (match) => {
        return `<span 
                  style="background-color: #FFD700; cursor: pointer;" 
                  data-tip="${description}" 
                  data-tooltip-id="tooltip-${index}"
                  class="highlighted-term">${match}</span>`;
      });
    });
    return highlightedText;
  };

  // Handle title change
  const handleTitleChange = (e) => {
    const newTitle = e.target.innerText;
    if (selectedNote && newTitle !== selectedNote.title) {
      updateTitle(selectedNote.id, newTitle);
    }
  };

  // Handle content change
  const handleContentChange = (e) => {
    const content = e.target.innerHTML;
    updateNote(selectedNote.id, { ...selectedNote, content:content });
  };

  const handleAnalyzeContent = async () => {
    if (selectedNote?.content) {
      try {
        const terms = await extractKeyTerms(selectedNote.content);

        const validatedTerms=JSON.parse(terms);
        console.log("validation term:",validatedTerms)
        setKeyTerms(validatedTerms);
  
        const editor = document.getElementById("editor");
        const highlightedContent = highlightTerms(selectedNote.content, validatedTerms);
        editor.innerHTML = highlightedContent;
      } catch (error) {
        console.error("Error analyzing content:", error);
      }
    }
  };

  const handleSummarize=async()=>{
    if (selectedNote?.content) {
      try {
        const summary = await getSummary(selectedNote.content);
  
        const editor = document.getElementById("editor");
        
        editor.innerHTML =summary;
      } catch (error) {
        console.error("Error summarizing content:", error);
      }
    }
  }
  return (
    <div className="flex-1 flex flex-col">
      {/* Toolbar for formatting and alignment */}
      <Toolbar
        onFormat={(format) => {
            const selection = window.getSelection();

            if (!selection || selection.isCollapsed) return;

            const range = selection.getRangeAt(0);
            const selectedNode = range.startContainer;

            let isFormatted = false;

            switch (format) {
              case 'bold':
                isFormatted =
                  selectedNode.parentElement && selectedNode.parentElement.style.fontWeight === 'bold';
                document.execCommand('bold');
                break;

              case 'italic':
                isFormatted =
                  selectedNode.parentElement && selectedNode.parentElement.style.fontStyle === 'italic';
                document.execCommand('italic');
                break;

              case 'underline':
                isFormatted =
                  selectedNode.parentElement && selectedNode.parentElement.style.textDecoration === 'underline';
                document.execCommand('underline');
                break;
              default:
                console.error(`Unsupported format: ${format}`);
                return;
            }

            const editorContent = document.getElementById('editor');
            const editorTitle = document.getElementById('title');

            if (editorContent) editorContent.normalize();
            if (editorTitle) editorTitle.normalize();
            updateTitle(selectedNote.id, editorTitle.innerHTML);
            updateNote(selectedNote.id, { ...selectedNote, content: editorContent.innerHTML });
          }}
        onAlignment={(alignment) => {
          const selection = window.getSelection();

          if (!selection || selection.isCollapsed) return;

          const range = selection.getRangeAt(0);
          const selectedNote = range.startContainer;

          // Handle alignment based on input
          switch (alignment) {
            case 'left':
              document.execCommand('justifyLeft');
              break;
            case 'center':
              document.execCommand('justifyCenter');
              break;
            case 'right':
              document.execCommand('justifyRight');
              break;
            default:
              console.error(`Unsupported alignment: ${alignment}`);
              return;
          }

          // Normalize and update content
          const editorContent = document.getElementById('editor');
          if (editorContent) editorContent.normalize();
          updateNote(selectedNote.id, { ...selectedNote, content: editorContent.innerHTML });
        }}

        onFontFormat={(action) => {
          const editorContent = document.getElementById('editor'); // Ensure the editor exists
          if (!editorContent) return;
        
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0); // Get the selected range
            const selectedText = range.toString(); // The actual selected text
        
            if (!selectedText) return; // No text selected, exit
        
            let span;
        
            // Check if the selected text is already wrapped in a span
            if (range.startContainer.parentElement.tagName === 'SPAN') {
              span = range.startContainer.parentElement;
            } else {
              // Wrap the selected text in a new span
              span = document.createElement('span');
              span.textContent = selectedText;
              range.deleteContents();
              range.insertNode(span);
            }
        
            // Ensure we have valid styles for the span
            const currentSize = parseInt(window.getComputedStyle(span).fontSize) || 16; // Default to 16px if no font size
            let newSize;
        
            // Adjust font size based on action
            switch (action) {
              case 'increase':
                newSize = currentSize + 4; // Increase font size by 4px
                break;
              case 'decrease':
                newSize = currentSize - 4; // Decrease font size by 4px
                break;
              default:
                console.log('Invalid action');
                return;
            }
        
            // Apply the new font size
            span.style.fontSize = `${newSize}px`;
        
            // Normalize the editor content to clean up potential overlapping ranges
            editorContent.normalize();
        
            // Update the note's content
            updateNote(selectedNote.id, {
              ...selectedNote,
              content: editorContent.innerHTML,
            });
          }
        }}
        
        
        onDelete={() => {
          deleteNote();
        }}

        onAnalyze={handleAnalyzeContent}
        onSummarize={handleSummarize}
      />

      {/* Editable Content */}
      <div className="flex flex-col p-4 h-screen">
        {/* Editable Title */}
        <div
          id="title"
          contentEditable
          className="text-xl font-medium mb-2 w-full outline-none bg-[#1E1E1E] text-white rounded-md px-4 py-2 md:min-h-10"
          onInput={handleTitleChange}
          dangerouslySetInnerHTML={{__html:selectedNote?.title}}
        />
          

        {/* Editable Content Area */}
        <div
          id="editor"
          contentEditable
          style={{ textAlign: selectedNote.alignment || 'left' }}
          className="flex-grow outline-none bg-[#1E1E1E] text-white rounded-md px-4 py-2 min-h-fit"
          dangerouslySetInnerHTML={{ __html: highlightTerms(selectedNote.content, keyTerms) }}
          onInput={handleContentChange}
        />
      </div>
      <TooltipComponent keyTerms={keyTerms}/>
    </div>
  );
};

const TooltipComponent = ({ keyTerms }) => {
  return (
    <>
      {keyTerms.map((term, index) => (
        <Tooltip
          key={index}
          id={`tooltip-${index}`}  // Unique ID for each term's tooltip
          place="top"
          effect="solid"
        >
          {term.description}
        </Tooltip>
      ))}
    </>
  );
};