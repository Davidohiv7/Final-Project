import React from 'react'

import ProductCard from './components/ProductCards/ProductCards'

import { ThemeProvider } from '@material-ui/core/styles'

import theme from './themeConfig.js';

import Box from '@material-ui/core/Box'

function App() {
  return (
  	<ThemeProvider theme = {theme}>
  	    <Box display='flex'>
      		<ProductCard/>
			<ProductCard/>
			<ProductCard/>
    	</Box>	
  	</ThemeProvider>
  );
}

export default App;
