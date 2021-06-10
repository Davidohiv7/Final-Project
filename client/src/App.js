import React from 'react';
import NavBar from './Views/NavBar/NavBar'
import Home from './Views/Home/Home.jsx'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './themeConfig'

import theme from './themeConfig.js';

import NavBar from './components/Navbar/NavBar'
import ProductCards from './components/ProductCards/ProductCards'
import { Catalogue } from './components/Catalogue/Catalogue.jsx';

export default function App() {
  return (
  	<ThemeProvider theme = {theme}>
      <NavBar/>
      <Catalogue/>
  	</ThemeProvider>
  );
}

