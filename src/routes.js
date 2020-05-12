import React from 'react';
import {Route} from 'react-router';
import SignIn from './views/signin';
import SignUp from './views/signup';

import App from './App';

export default(

    <Route exact path="/" component={App} >
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    </Route>
);