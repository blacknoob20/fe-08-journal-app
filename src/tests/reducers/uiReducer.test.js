import { flushSync } from "react-dom";
import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

describe('Pruebas en el uiReducer.js', () => {

    test('Debe devolver el mensaje del error en el estado.', () => {
        const initAction = { type: types.uiSetError, payload: 'Probando el error' };
        const initState = { loading: false, msgError: null };
        const state = uiReducer(initState, initAction);

        expect(state.msgError).not.toBe(null);
    });

    test('Debe devolver el estado sin el mensaje de error.', () => {
        const initState = { loading: false, msgError: 'Probando el error' };
        const state = uiReducer(initState, { type: types.uiRemoveError });

        expect(state.msgError).toEqual(null);
    });

    test('Debe devolver el estado del loading en true', () => {
        const initState = { loading: false, msgError: null };
        const state = uiReducer(initState, { type: types.uiStartLoading });

        expect(state.loading).toBe(true);
    });

    test('Debe devolver el estado final del loading en false', () => {
        const initState = { loading: true, msgError: null };
        const state = uiReducer(initState, { type: types.uiFinishLoading });

        expect(state.loading).toBe(false);
    });

    test('Deve devolver el estado por defecto.', () => {
        const initState = { loading: false, msgError: null };
        const state = uiReducer(initState, { type: null });

        expect(state).toEqual(initState);
    });
});