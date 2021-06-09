import React from 'react'

import ProductCard from './components/ProductCards/ProductCards'

import { ThemeProvider } from '@material-ui/core/styles'

import theme from './themeConfig.js';

function App() {
  return (
  	<ThemeProvider theme = {theme}>
  	    <div>
      		<ProductCard></ProductCard>
    	</div>	
  	</ThemeProvider>
  );
}

export default App;
