import React from 'react';
import { Router, Switch, Route } from "react-router-dom";

//import App from './App';
const loading = () => <div>Loading...</div>;
const Home = React.lazy(()=> import('./views/Pages/Home.js'));
const Room = React.lazy(()=> import('./views/Pages/Room.js'));

const MainRouter = () => (
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <Switch>
                      <Route exact path="/" name="home" render = {props=><Home {...props}/>} />
                      <Route exact path="/room/:slug" name="room" render = {props=><Room {...props}/>} />
                    </Switch>
                </React.Suspense>
           </BrowserRouter>
)


// Private Route to check for authentication

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}


export default MainRouter;
