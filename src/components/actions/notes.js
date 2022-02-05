import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebaseConfig';
import { loadNotes } from '../../helpers/loadNotes';
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
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    };
};

export const setNotes = (notes) => ({
    type: types.notesLoadEntry,
    payload: notes
});

export const startSaveNotes = (note) => {
    return (async(dispatch, getState) => {
        const {uid} = getState().auth;
        const noteToFirestore = {...note, url:' '}

        delete noteToFirestore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

        await updateDoc(noteRef, noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire('Saved',note.title,'success');
    });
};

export const refreshNote = (id, note) => ({
    type: types.notesUpdEntry,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});