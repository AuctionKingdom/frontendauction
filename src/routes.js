import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import SignIn from './views/signin';
import SignUp from './views/signup';
import Home from './views/Home';
import history from './history';

//import App from './App';

const MainRouter = () => (
    <div>
        <Router history={history}>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/room" component={Home} />

        </Switch>
        </Router>
    </div>
)


export default MainRouter;