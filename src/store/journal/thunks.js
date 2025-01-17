import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './journalSlice'
import { loadNotes } from '../../helpers/loadNotes'
import { fileUpload } from '../../helpers/fileUpload'

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        }
        
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) )
        await setDoc( newDoc, newNote );

        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) ) 
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        if(!uid){
            throw new Error('El uid del usuario no esta definido.')
        }

        const notes = await loadNotes( uid )

        dispatch( setNotes( notes ) )

    }
}

export const startSaveNote = () => {

    return async( dispatch, getState ) => {

        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = {...note}
        delete noteToFireStore.id
        
        const docRef = doc(FirebaseDB, `/${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch( updateNote(note) )
    }

}

export const stratUploadingFiles = ( files = [] ) => {
    return async(dispatch) => {
        dispatch( setSaving() );
        await fileUpload( files[0] )

        // await fileUpload(files[0])
        const fileUploadPromises = [];
        for(const file of files){
            fileUploadPromises.push(fileUpload(file))
        }

        const photoUrls = await Promise.all( fileUploadPromises );
        console.log(photoUrls)

        dispatch( setPhotosToActiveNote( photoUrls ) )

    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `/${uid}/journal/notes/${note.id}`)
        const resp = await deleteDoc(docRef);
        
        dispatch( deleteNoteById( note.id ) )
    }
}