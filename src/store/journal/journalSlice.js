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
      state.messageSaved = '';
    },

    setNotes: ( state, action ) => { // Listar
      if(!action.payload) return;
      state.notes = action.payload
    },

    setSaving: (state) => { // Guardar una nota
        state.isSaving = true;
        state.messageSaved = '';
        //TODO: mensaje de error...
    },

    updateNote: (state, action) => { // Actualizar una nota
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if( note.id === action.payload.id ){
          return action.payload;
        }
        return note
      })

      //TODO: Mostrar mensaje de actualización
      state.messageSaved = `${action.payload.title}, actualizado correctamente.`
    },

    setPhotosToActiveNote: (state, action) => { // Agregar fotos a una nota
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
        state.isSaving = false
    },

    clearNotesLogout(state) {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    },

    deleteNoteById: (state, action) => { // Eliminar una nota
      state.active = null
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    }
  }
});

export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions

export default journalSlice.reducer