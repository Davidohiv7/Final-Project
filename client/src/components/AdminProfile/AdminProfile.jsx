import React, { useState } from 'react';


// Material UI imports
import { Grid, Paper, Container, CardContent, Typography, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';

//Component imports
import AdminDisplay from './AdminDisplay/AdminDisplay';



export default function AdminProfile() {
  const [displayStatus, setDisplayStatus] = useState('products')
  const classes = useStyles();

  const displayHandler = (value) => {
    setDisplayStatus(value);
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.container} align= 'center'>
        <Grid item xs={2} className={classes.filterGrid} >
          <CardContent className= {classes.profileContainer}>
            <Typography variant="h5" color="secondary" display='inline'>Admin Name</Typography>
            <Avatar className={classes.profilePic}>U</Avatar>

            <Button onClick={() => {displayHandler('products')}} size= 'small' className={classes.button}><Typography variant= 'button'>Products</Typography></Button>
            <Button onClick={(e) => {displayHandler('categories')}} size= 'small' className={classes.button}><Typography variant= 'button'>Categories</Typography></Button>
            <Button size= 'small' className={classes.button}><Typography variant= 'button'>Orders</Typography></Button>
            <Button  size= 'small' className={classes.button}><Typography variant= 'button'>Users</Typography></Button>
            <Button  size= 'small' className={classes.button}><Typography variant= 'button'>Log Out</Typography></Button>

          </CardContent>
        </Grid>
        <Grid className={classes.slideContainer} item xs={9}>
          <Paper className={classes.slide} elevation={3}>
            <AdminDisplay setDisplayStatus={setDisplayStatus} displayStatus={displayStatus}/>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}
