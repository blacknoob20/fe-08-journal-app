import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage } from '../components/auth/LoginPage';
import { RegisterPage } from '../components/auth/RegisterPage';

export const AuthRouter = () => {
    return (
        <Router>
            <div className="auth__main">
                <div className="auth__box-container">
                    <Switch>
                        <Route path="/auth/login">
                            <LoginPage />
                        </Route>
                        <Route path="/auth/register">
                            <RegisterPage />
                        </Route>
                        <Route path="/">
                            <Redirect to="/auth/login" />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
