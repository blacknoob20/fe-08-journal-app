import { noteReducer } from '../../reducers/noteReducer';
import { types } from '../../types/types';

describe('Pruebas en noteReducer.js', () => {
    let notes = {
        notes: [],
        active: null
    };

    test('Debe devolver la nota activa en el estado.', () => {
        notes.notes = [
            {
                id: '1',
                body: null,
                date: new Date().getTime(),
                title: 'Primera nota',
                url: null
            }
        ];
        const noteActive = {
            id: '1',
            body: null,
            date: new Date().getTime(),
            title: 'Primera nota',
            url: null
        }
        const action = { type: types.notesActiveEntry, payload: noteActive };
        notes = noteReducer(notes, action);

        expect(notes.active).not.toBe(null);
    });

    test('Debe agregar una nueva nota en el estado.', () => {
        const newNote = {
            id: '2',
            body: null,
            date: new Date().getTime(),
            title: 'Segunda nota',
            url: null
        };
        const action = { type: types.notesAddEntry, payload: newNote };
        notes = noteReducer(notes, action);

        expect(notes.notes.length).toBe(2);
    });

    test('Debe inicialiar las notas en el estado.', () => {
        const newNote = [...notes.notes, {
            id: '3',
            body: null,
            date: new Date().getTime(),
            title: 'Tercera nota',
            url: null
        }];
        const action = { type: types.notesLoadEntry, payload: newNote };
        // notes.active = null;
        notes = noteReducer(notes, action);

        expect(notes.notes).toEqual(newNote);
    });

    test('Debe modificar la nota que coincida con el ID.', () => {
        const updNote = {
            id: '2',
            body: null,
            date: new Date().getTime(),
            title: 'Segunda nota (Modificado)',
            url: null
        };

        const action = {
            type: types.notesUpdEntry,
            payload: { id: '2', note: updNote }
        };
        notes = noteReducer(notes, action);

        expect(notes.notes[0].title).toBe(updNote.title);
    });

    test('Debe eliminar la nota que coincida con el ID', () => {
        const idNotaActiva = notes.active.id;
        const action = { type: types.notesDelEntry, payload: idNotaActiva };
        notes = noteReducer(notes, action);

        expect(notes.notes.length).toBe(2);
        expect(notes.active).toBe(null);
    });

    test('Debe limipiar las el estado al salir de la sesion.', () => {
        const action = { type: types.notesLogoutClean };

        notes = noteReducer(notes, action);

        expect(notes.notes.length).toBe(0);
        expect(notes.active).toBe(null);
    });
});