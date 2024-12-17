import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      pinned: false,
      encrypted: false,
      lastModified: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(note =>
      note.id === id
        ? {
            ...note,
            ...updates,
            title: note.title,
            lastModified: new Date().toISOString()
          }
        : note
    ));
  };
  

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };
  
  const updateTitle = (id, newTitle) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, title: newTitle, lastModified: new Date().toISOString() } : note
    ));
  };

  const togglePin = (id) => {
    const note = notes.find(n => n.id === id);
    updateNote(id, { pinned: !note.pinned });
  };


  return (
    <NotesContext.Provider value={{
      notes,
      selectedNote,
      setSelectedNote,
      createNote,
      updateNote,
      updateTitle,
      deleteNote,
      togglePin,
    }}>
      {children}
    </NotesContext.Provider>
  );
};