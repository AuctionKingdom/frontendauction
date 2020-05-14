import React from 'react';
import { BrowserRouter, Route, Switch , Redirect} from 'react-router-dom';
import * as Constants from './components/constants';
import SocketContext from './socket-context';
import socketIOClient from 'socket.io-client';
import MainRouter from './routes.js';

const socket = socketIOClient(Constants.socketlink);

function App() {

  return(
    <SocketContext.Provider value={socket}>
        <MainRouter />
    </SocketContext.Provider>
  )

}


export default App;
