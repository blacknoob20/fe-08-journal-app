import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { JournalPage } from '../journal/JournalPage';
import { AuthRouter } from './AuthRouter';
import { login } from '../components/actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes } from '../store/store';
import { startLoadingNotes } from '../components/actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, async(currentUser) => {

            if (currentUser?.uid) {
                dispatch(login(currentUser.uid, currentUser.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(currentUser.uid));

            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking]);

    if (checking) {
        return (
            <h1>Please wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
                {/* App router V1 */}
                {/* <Switch>
                    <Route path="/auth">
                        <AuthRouter />
                    </Route>
                    <Route exact path="/">
                        <JournalPage />
                    </Route>
                </Switch> */}
                {/* App router v2 */}
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isLoggedIn={isLoggedIn}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalPage}
                        isLoggedIn={isLoggedIn}
                    />
                    <Redirect to="auth/login"/>
                </Switch>
            </div>
        </Router>
    );
}
