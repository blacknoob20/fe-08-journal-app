import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer.js', () => {
    test('Debe retornar el estado por defecto.', () => {
        const state = authReducer({}, {});
        expect(state).toEqual({});
    });

    test('Debe iniciar sesion y retornar el {uid, name}.', () => {
        const action = {
            type: types.login,
            payload: {
                uid: '45df45fddf',
                displayName: 'Cristhian Rene'
            }
        };
        const state = authReducer({}, action);

        expect(state).toEqual({ uid: '45df45fddf', name: 'Cristhian Rene' });
    });

    test('Debe limpiar el estado al salir de la sesion', () => {
        const iniState = { uid: '45df45fddf', name: 'Cristhian Rene' };
        const action = { type: types.logout }
        const state = authReducer(iniState, action);

        expect(state).toEqual({});
    });
});