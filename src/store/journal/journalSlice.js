/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
//   active: {
//     id:'ABC123',
//     title: '',
//     body: '',
//     date: 1234567,
//     imageUrls: [], https://foto1.jpg, https://foto2.jpg, https://foto2.jpg
//   }
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => { // abrir modal para una nueva nota
      state.notes.push( action.payload );
      state.isSaving = false;
    },
    setActiveNote: ( state, action ) => { // Seleccionar nota
      state.active = action.payload
    },
    setNotes: ( state, action ) => { // Listar
      if(!action.payload) return;
      state.notes = action.payload
    },
    setSaving: (state) => { // Guardar una nota
        
    },
    updateNote: (state, action) => { // Actualizar una nota

    },
    deleteNoteById: (state, action) => { // Eliminar una nota
        
    }
  }
});

export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote } = journalSlice.actions

export default journalSlice.reducer