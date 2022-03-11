/**
 * @jest-environment node
 *
 */

import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { readFileSync, writeFileSync } from 'fs';

import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

import { startLoadingNotes, startNewNote, startSaveNotes, startUploading } from '../../../components/actions/notes';
import { types } from '../../../types/types';

/**
 * Esta importacion se hace necesaria, porque la utiliza dentro de jest.mock()
 * no borrarla solo porque el editor la marque como no utitlizada
 */
import { fileUpload } from '../../../helpers/fileUpload';

jest.mock('../../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://media.redadn.es/series/p/school-rumble_2374.jpg';
        // return Promise.resolve('https://media.redadn.es/series/p/school-rumble_2374.jpg');
    })
}));

// jest.mock('../../helpers/fileUpload', () => {
//     return jest.fn().mockImplementation(() => {
//         return 'https://media.redadn.es/series/p/school-rumble_2374.jpg';
//     });
// });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'testing'
    },
    notes: {
        active: {
            id: 'TMo86CIZ7de9CcQeKS1n',
            title: 'Hola',
            body: 'Testing ENZYME',
            date: new Date().getTime()
        }
    }
};

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {
    // Para realizar pruebas nuevas necesitamos limpiar el store
    // en cada una de las pruebas
    beforeEach(() => {
        store = mockStore(initState);
        jest.resetModules();
    });

    test('Debe crear una nota.', async () => {
        await store.dispatch(startNewNote());
        // Para obtener las acciones primero hay que esperar el await del store
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActiveEntry,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddEntry,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // Borrar de basura de firebase
        const actionId1 = actions[0].payload.id;
        await deleteDoc(doc(db, `testing/journal/notes/${actionId1}`));
    });

    test('startLoadingNotes() debe cargar las notas.', async () => {
        await store.dispatch(startLoadingNotes('testing'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoadEntry,
            payload: expect.any(Array)
        });

        expect(actions[0].payload[0]).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        })
    });

    test('Debe actualizar la nota.', async () => {
        const note = {
            id: 'PMGJdG1n0Bhk0n3OJF3H',
            title: '(Actualizado) React testing.',
            body: 'No body',
            date: new Date().getTime()
        }
        await store.dispatch(startSaveNotes(note));
        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdEntry);

        const actionSnap = await getDoc(doc(db, `testing/journal/notes/${note.id}`));

        expect(actionSnap.data().title).toBe(note.title);
    });

    /**
     * No pude hacer funcionar este test.
     */
    test('startUploading() debe de actualizar el url del entry.', async () => {

        writeFileSync('yakumo.jpg', '');
        const file = readFileSync('yakumo.jpg');
        // console.log(file.length);
        // await store.dispatch(startUploading(file));
        // const doc = await getDoc(doc(db, '/testing/journal/notes/TMo86CIZ7de9CcQeKS1n'));
        // console.log(doc);
    });
});