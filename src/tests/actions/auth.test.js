import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPass, startLogout } from '../../components/actions/auth';
import { types } from '../../types/types';
import { async } from '@firebase/util';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {
    beforeEach(() => {
        store = mockStore(initState);
    })

    test('Login y logut deben de crear la accion respectiva.', () => {
        const uid = '123456789';
        const name = 'Cristhian Guerrero';

        const actionLogin = login(uid, name);

        expect(actionLogin.payload).toEqual({ uid: uid, displayName: name });

        const actionLogout = logout();

        expect(typeof actionLogout.payload).toBe('undefined');
    });

    test('Debe realizar el startLogout', async () => {
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });
        expect(actions[1]).toEqual({
            type: types.notesLogoutClean
        });
    });

    test('Debe de iniciar el startLoginEmailPass.', async () => {
        await store.dispatch(startLoginEmailPass('crguerrero@test.com', '123456'));

        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'lVQOoPzePnZTNuj2e59LItShdQt1',
                displayName: null,
            }
        });
    });

});