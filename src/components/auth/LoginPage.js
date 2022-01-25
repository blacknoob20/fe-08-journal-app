import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPass } from '../actions/auth';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);
    const [formValues, handleInputChange] = useForm({
        email: 'blacknoob20@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
        dispatch(startLoginEmailPass(email, password));
    };
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }


    return (
        <>
            <h1 className="auth__title">Login Page</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <br />
                <br />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>
                <br />
                <br />
                <hr />
                <br />
                <div className="auth__social-networks">
                    <p>Login with social network</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <br />
                <Link to="/auth/register" className="link">
                    Create a new account
                </Link>
            </form>
        </>
    )
}
