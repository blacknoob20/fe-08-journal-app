import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

        dispatch(activeNote(docRef.id, newNote));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActiveEntry,
    payload: {
        id,
        ...note
    }
})