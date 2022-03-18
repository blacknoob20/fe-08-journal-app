import React from 'react';
import { mount } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// Me permite fingir las rutas y trabajar como si estuviera en el router del navegador
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { LoginPage } from '../../../components/auth/LoginPage';
import { startGoogleLogin, startLoginEmailPass } from '../../../components/actions/auth';

jest.mock('../../../components/actions/auth', () => ({
    startGoogleLogin: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginPage/>', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('Debe mostrarse correctamente.', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe disparar el login de google', () => {
        wrapper.find('.google-btn').prop('onClick');

        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('Debe disparar el email login, con los respectivos argumentos.', () => {
        wrapper.find('form').prop('onSubmit')(
            { preventDefault() { } }
        );

        expect(startLoginEmailPass).toHaveBeenCalledWith('prueba@gmail.com','123456');
    });
});