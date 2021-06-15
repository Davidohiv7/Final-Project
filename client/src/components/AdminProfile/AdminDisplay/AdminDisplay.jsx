import React from 'react';


// Material UI imports
import {Container, CardContent, Button} from '@material-ui/core';
import useStyles from './styles';

import CreateProduct from './CreateProduct/CreateProduct';
import Products from './Products/Products'
import ManageUsers from './ManageUsers/ManageUsers';


export default function AdminDisplay({displayStatus, setDisplayStatus}) {

  const classes = useStyles();
  
  
  if(displayStatus === 'create_product') {
    return (
        <CardContent className= {classes.formContainer}>
          <CreateProduct/>
        </CardContent>
    )
  }
  
  if(displayStatus === 'products') {
    return (
      <CardContent className= {classes.formContainer}>
        <Button onClick={()=>setDisplayStatus('create_product')}>ADD PRODUCT</Button>
        <Products/>
      </CardContent>
    )
  }

  // if(displayStatus === 2) {
  //   return (
  //     <CardContent className= {classes.formContainer}>

  //     </CardContent>
  //   )
  // }

  // if(displayStatus === 3) {
  //   return (<h1>Manage notifications</h1>)
  // }


  return (
  <Container>
    
  </Container>
  );
}
