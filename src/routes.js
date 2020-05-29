import React from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";

//import App from './App';
const loading = () => <div>Loading...</div>;
const SignIn = React.lazy(()=>import('./views/Pages/signin'));
const SignUp = React.lazy(()=>import('./views/Pages/signup'));
const Home = React.lazy(()=> import('./views/Pages/Home.js'));
const Room = React.lazy(()=> import('./views/Pages/Room.js'));

const MainRouter = () => (
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <Switch>
                       <Route exact path="/" component={SignIn} />
                       <Route exact path="/signin" component={SignIn} />
                       <Route exact path="/signup" component={SignUp} />
                      <Route exact path="/home" name="home" render = {props=><Home {...props}/>} />
                      <Route exact path="/room/:slug" name="room" render = {props=><Room {...props}/>} />
                    </Switch>
                </React.Suspense>
           </BrowserRouter>
)

export default MainRouter;
