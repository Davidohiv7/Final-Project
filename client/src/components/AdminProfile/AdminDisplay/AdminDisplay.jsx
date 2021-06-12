import React from 'react';


// Material UI imports
import {Container, Box, CardContent} from '@material-ui/core';
import useStyles from './styles';

import CreateForm from './CreateForm/CreateForm'


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
    return (<h1>Manage Products</h1>)
  }


  return (
  <Container>
    
  </Container>
  );
}
