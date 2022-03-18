import { mount } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { RegisterPage } from '../../../components/auth/RegisterPage';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    name: 'Evelin',
    email: 'evelinfranco7@gmail.com',
    password: 123456,
    password2: 123456
}

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <RegisterPage />', () => {
    const wrapper = mount(
        <Provider store={store}>
            <RegisterPage />
        </Provider>
    );

    test('Debe mostrarse correctamente', () => {

    });
});