import React from 'react';
import NavBar from './Views/NavBar/NavBar'
import Home from './Views/Home/Home.jsx'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './themeConfig.js'


export default function App() {
  return (
  	<ThemeProvider theme = {theme}>
      <div>Home</div>
  	</ThemeProvider>
  );
}

