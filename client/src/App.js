import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'

import theme from './themeConfig.js';

import Catalogue from './components/Catalogue/Catalogue'

function App() {
  return (
  	<ThemeProvider theme = {theme}>
		  <Catalogue/>
  	</ThemeProvider>
  );
}

export default App;
