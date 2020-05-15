import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routes';
import { MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
   "fontFamily": `"Raleway", sans-serif`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

function App() {
    return(
      <MuiThemeProvider theme={THEME}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </MuiThemeProvider>
    )
}

export default App;
