import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
        console.log(docRef);
    };
};