import { types } from '../../types/types';

describe('Pruebas en Types.js', () => {
    test('Debe retornar el objeto de tipos', () => {
        const typesOri = types;
        const typesTest = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError:'[UI] Set Error',
            uiRemoveError: '[UI] Unset Error',
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',

            notesAddEntry: '[Notes] New note',
            notesActiveEntry: '[Notes] Set active note',
            notesLoadEntry: '[Notes] Load notes',
            notesUpdEntry: '[Notes] Updated note',
            notesDelEntry: '[Notes] Delete note',
            notesLogoutClean: '[Notes] Logut cleaning',

        }

        expect(typesTest).toEqual(typesOri);
    });
});