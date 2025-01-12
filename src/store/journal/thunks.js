import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from './journalSlice'
import { loadNotes } from '../../helpers/loadNotes'

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth

        const newNote = {
            title:'example dawdawdaw dawdawdaw dajkwhwkjdhaw dkjawhkjdhwakj dkjwahdjkw',
            body:'example',
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

        

    }

}