import React from 'react';


// Material UI imports
import {Container, Box, CardContent} from '@material-ui/core';
import useStyles from './styles';

import CreateForm from './CreateForm/CreateForm';
import ManageProducts from './ManageProducts/ManageProducts'
import ManageUsers from './ManageUsers/ManageUsers';


export default function AdminDisplay({displayStatus}) {

  const classes = useStyles();
  
  if(displayStatus === 0) {
    return (
      <CardContent className= {classes.formContainer}>
        <CreateForm/>
      </CardContent>
    )
  }

  if(displayStatus === 1) {
    return (
      <CardContent className= {classes.formContainer}>
        <ManageProducts/>
      </CardContent>
    )
  }

  if(displayStatus === 2) {
    return (
      <CardContent className= {classes.formContainer}>
        <ManageUsers/>
      </CardContent>
    )
  }

  if(displayStatus === 3) {
    return (<h1>Manage notifications</h1>)
  }


  return (
  <Container>
    
  </Container>
  );
}
