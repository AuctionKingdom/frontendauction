import React from "react";

import * as Constants from "./components/constants";
import SocketContext from "./socket-context";
import socketIOClient from "socket.io-client";
import MainRouter from "./routes.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Raleway", sans-serif`,
    fontSize: 12,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const socket = socketIOClient(Constants.socketlink);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <MuiThemeProvider theme={THEME}>
        <MainRouter />
      </MuiThemeProvider>
    </SocketContext.Provider>
  );
}

export default App;
