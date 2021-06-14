import React, { useState } from 'react';


// Material UI imports
import { Grid, Paper, Container, CardContent, Typography, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';

//Component imports
import AdminDisplay from './AdminDisplay/AdminDisplay';



export default function AdminProfile() {
  const [displayStatus, setDisplayStatus] = useState(0)
  const classes = useStyles();

  const displayHandler = (value) => {
    setDisplayStatus(value);
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.container} align= 'center'>
        <Grid item xs={2} className={classes.filterGrid} >
          <CardContent className= {classes.profileContainer}>
            <Typography variant="h5" color="secondary" display='inline'>Username</Typography>
            <Avatar className={classes.profilePic}>U</Avatar>

            <Button onClick={() => {displayHandler(0)}} size= 'small' className={classes.button}><Typography variant= 'button'>Create Product/Category</Typography></Button>
            <Button onClick={(e) => {displayHandler(1)}} size= 'small' className={classes.button}><Typography variant= 'button'>Manage Products</Typography></Button>
            <Button onClick={(e) => {displayHandler(2)}} size= 'small' className={classes.button}><Typography variant= 'button'>Manage Users</Typography></Button>
            <Button onClick={(e) => {displayHandler(3)}} size= 'small' className={classes.button}><Typography variant= 'button'>Manage Notifications</Typography></Button>
            <Button  size= 'small' className={classes.button}><Typography variant= 'button'>Log Out</Typography></Button>

          </CardContent>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.slide} elevation={3}>
            <AdminDisplay displayStatus={displayStatus}/>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}
