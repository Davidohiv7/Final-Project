import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'

import theme from './themeConfig.js';

import NavBar from './components/Navbar/NavBar'
import ProductCards from './components/ProductCards/ProductCards'
import { Catalogue } from './components/Catalogue/Catalogue.jsx';

function App() {
  return (
  	<ThemeProvider theme = {theme}>
      <NavBar/>
      <Catalogue/>
  	</ThemeProvider>
  );
}

export default App;
