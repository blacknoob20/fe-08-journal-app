import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPassword } from '../actions/auth';
import { removeError, setError } from '../actions/ui';

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    const [formValues, handleInputChange] = useForm({
        name: 'Evelin',
        email: 'evelinfranco7@gmail.com',
        password: 123456,
        password2: 123456
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(name, email, password, password2);
        if (isFormValid()) {
            console.log('Form is valid!');
            dispatch(startRegisterWithEmailPassword(email, password));
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            console.log('Name is required');
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            console.log('Email is not valid');
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            console.log('Password should be at least 6 characters and match each other');
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());

        return true;
    }

    return (

        <>
            <h1 className="auth__title">Register Page</h1>
            <form onSubmit={handleRegister}>
                {
                    msgError &&
                    <div className='auth_alert-error'>
                        {msgError}
                    </div>
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />
                <br />
                <br />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Register
                </button>
                <br />
                <br />
                <Link to="/auth/login" className="link">
                    Already registered.?
                </Link>
            </form>
        </>
    )
}
