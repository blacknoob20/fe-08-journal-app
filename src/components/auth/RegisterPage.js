import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const RegisterPage = () => {
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
    }

    return (

        <>
            <h1 className="auth__title">Register Page</h1>
            <form onSubmit={handleRegister}>
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
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Register
                </button>
                <Link to="/auth/login" className="link">
                    Already registered.?
                </Link>
            </form>
        </>
    )
}
