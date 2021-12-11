import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { JournalPage } from '../journal/JournalPage';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/auth">
                        <AuthRouter />
                    </Route>
                    <Route exact path="/">
                        <JournalPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
