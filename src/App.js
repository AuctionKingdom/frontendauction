import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Constants from './components/constants';
import SocketContext from './socket-context';
import socketIOClient from 'socket.io-client';


const loading = () => <div>Loading...</div>;
const Home = React.lazy(()=> import('./views/Pages/Home.js'));
const Room = React.lazy(()=> import('./views/Pages/Room.js'));

const socket = socketIOClient(Constants.socketlink);

function App() {

  return(
    <SocketContext.Provider value={socket}>
        <BrowserRouter>
            <React.Suspense fallback={loading()}>
                <Switch>
                  <Route exact path="/" name="home" render = {props=><Home {...props}/>} />
                  <Route exact path="/room/:slug" name="room" render = {props=><Room {...props}/>} />
                </Switch>
            </React.Suspense>
       </BrowserRouter>
    </SocketContext.Provider>
  )

}

export default App;
