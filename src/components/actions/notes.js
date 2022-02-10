import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
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
        console.log(activeNote(docRef.id, newNote));
        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActiveEntry,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddEntry,
    payload: {
        id,
        ...note
    }
})

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
    return (async (dispatch, getState) => {
        console.log(note.id);
        const { uid } = getState().auth;
        const noteToFirestore = { ...note };

        delete noteToFirestore.id;

        try {

            const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

            await updateDoc(noteRef, noteToFirestore);

            dispatch(refreshNote(note.id, noteToFirestore));

            Swal.fire('Saved', note.title, 'success');

        } catch (error) {
            throw error
        }
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

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;
        console.log(activeNote.id === undefined);

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);

        activeNote.url = fileUrl;
        dispatch(startSaveNotes(activeNote));
        Swal.close();
    }
};

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));

        dispatch(deleteNote(id));
    }
};

export const deleteNote = (id) => ({
    type: types.notesDelEntry,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutClean
});