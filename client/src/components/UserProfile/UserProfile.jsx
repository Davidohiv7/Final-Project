import React from 'react';


// Material UI imports
import { Grid, Paper, Container, CardContent, Typography, Avatar } from '@material-ui/core';
import useStyles from './styles';




export default function Home() {
  const classes = useStyles();


  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={2} className={classes.filterGrid}>
          <CardContent align= 'center'>
            <Typography  align='center' variant="h5" color="secondary" display='inline'>Username</Typography>
            <Avatar className={classes.profilePic} alt='Remy Sharp'>U</Avatar>
          </CardContent>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.slide} elevation={3}>
          </Paper>
        </Grid>
        <Grid item xs={9} className={classes.catalogueContainer}>
          <Paper elevation={3}>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
