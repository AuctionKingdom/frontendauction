import React, { useState } from "react";

import * as Constants from "./components/constants";
import SocketContext from "./socket-context";
import socketIOClient from "socket.io-client";
import MainRouter from "./routes.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const socket = socketIOClient(Constants.socketlink);

function App() {
  const [theme, setTheme] = useState({
    palette: {
      type: "light",
    },
    typography: {
      fontFamily: `"Raleway", sans-serif`,
      fontSize: 12,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  const THEME = createMuiTheme(theme);

  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType,
      },
      typography: {
        fontFamily: `"Raleway", sans-serif`,
        fontSize: 12,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
    });
  };

  return (
    <SocketContext.Provider value={socket}>
      <MuiThemeProvider theme={THEME}>
        <MainRouter onToggleDark={toggleDarkTheme} />
      </MuiThemeProvider>
    </SocketContext.Provider>
  );
}

export default App;
