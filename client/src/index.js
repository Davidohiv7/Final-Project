import React from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store'

import './index.css';
import App from './App';

const theme = createMuiTheme({
  palette: {
    // LightRed - DarkRed
    primary: {
      main: '#CE1212',
      dark: '#810000'
    },
    // LightGray - DarkGray
    secondary: {
      main: '#EEEBDD',
      dark: '#1B1717'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
