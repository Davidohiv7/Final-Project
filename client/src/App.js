import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'

import theme from './themeConfig.js';


function App() {
  return (
  	<ThemeProvider theme = {theme}>
		  
  	</ThemeProvider>
  );
}

export default App;
