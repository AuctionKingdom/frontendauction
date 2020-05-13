import React from 'react';
import {Route,Switch} from 'react-router';
import SignIn from './views/signin';
import SignUp from './views/signup';
import Home from './views/home';

//import App from './App';

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    </div>
)


export default MainRouter;