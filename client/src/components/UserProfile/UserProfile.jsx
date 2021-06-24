//react imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// Material UI imports
import {Grid, Container, CardContent, Typography, Avatar, Button, Box} from "@material-ui/core";
import useStyles from "./styles";
//Components imports
import UserOrders from "./Screens/UserOrders/UserOrders";
import UserInfo from "./Screens/UserInfo/UserInfo";

import { logOut } from '../../actions/authentication/authentication_actions'





export default function Home() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const { logged, user } = useSelector((state) => ({ ...state.authenticationReducer }))
  
  //local state used for the different screen displays
  const [screenDisplay, setScreenDisplay] = useState("accountConfig");

  //Route protection
  /* eslint-disable */
  useEffect(() => {
      if(!logged) {
        return history.push("/authentication");
      }
      if(user.role !== 'customer') {
        return history.push("/authentication");
    }
  }, [logged])
  /* eslint-enable */

  //function to display the different screens
  function displayScreens() {
    if(screenDisplay==='orderHistory') return (<UserOrders/>)
    if(screenDisplay==='accountConfig') return (<UserInfo user={user} />)
  }

  function handleLogOut() {
    localStorage.removeItem('jwt')
    dispatch(logOut())
    history.push("/");
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5} wrap='nowrap' className={classes.container}>
        <Grid item xs={2} className={classes.filterGrid} wrap='nowrap'>
          <CardContent align="center">
            <Typography
              align="center"
              variant="h5"
              color="secondary"
              display="inline"
            >
              {`${user && user.name} ${user && user.lastName}`}
            </Typography>
            <Avatar className={classes.profilePic}></Avatar>
            <Button className={classes.button} onClick={() => setScreenDisplay('accountConfig')}> Account Information</Button>
            <Button className={classes.button} onClick={() => setScreenDisplay('orderHistory')}> Order History </Button>
            <Box className={classes.BoxLogOut}>
              <Button className={classes.button} onClick={() => handleLogOut()}> Log Out </Button>
            </Box>
          </CardContent>
        </Grid>
        <Grid className={classes.screen} item xs={9} wrap='nowrap'>
            {displayScreens()}
        </Grid>
      </Grid>
    </Container>
  );
}
