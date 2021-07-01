import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// Material UI imports
import { Grid, Paper, Container, CardContent, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { SupervisorAccountRounded } from '@material-ui/icons';
//Actions
import { logOut } from '../../actions/authentication/authentication_actions'
//Component imports
import AdminDisplay from './AdminDisplay/AdminDisplay';



export default function AdminProfile() {

  let history = useHistory();
  const dispatch = useDispatch();

  const { logged, user } = useSelector((state) => ({ ...state.authenticationReducer }))

  const [displayStatus, setDisplayStatus] = useState('products')
  const classes = useStyles();

    //Route protection
  /* eslint-disable */
  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if(!jwt) {
      return history.push("/authentication");
    }
    if(logged && user.role === 'customer') {
      return history.push("/authentication");
    }
  }, [logged])

  function handleLogOut() {
    localStorage.removeItem('jwt')
    dispatch(logOut())
    history.push("/");
  }
  /* eslint-enable */
  const displayHandler = (value) => {
    setDisplayStatus(value);
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.container} align= 'center'>
        <Grid item xs={2} className={classes.filterGrid} >
          <CardContent className= {classes.profileContainer}>
            <Typography variant="h5" color="secondary" display='inline'>{`${user && user.name} ${user && user.lastName}`}</Typography>
            <SupervisorAccountRounded className={classes.profilePic}/>

            <Button onClick={() => {displayHandler('products')}} size= 'small' className={classes.button}><Typography variant= 'button'>Products</Typography></Button>
            <Button onClick={(e) => {displayHandler('categories')}} size= 'small' className={classes.button}><Typography variant= 'button'>Categories</Typography></Button>
            <Button onClick={(e) => {displayHandler('orders')}}  size= 'small' className={classes.button}><Typography variant= 'button'>Orders</Typography></Button>
            <Button onClick={(e) => {displayHandler('users')}} size= 'small' className={classes.button}><Typography variant= 'button'>Users</Typography></Button>
            <Button onClick={() => handleLogOut()} size= 'small' className={classes.button}><Typography variant='button' >Log Out</Typography></Button>

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
