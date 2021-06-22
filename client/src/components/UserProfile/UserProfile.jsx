//react imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// Material UI imports
import {
  Grid,
  Container,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";

//child components imports
import UserOrders from "./Screens/UserOrders/UserOrders";
import UserInfo from "./Screens/UserInfo";

import { logOut } from '../..//actions/authentication/authentication_actions'





export default function Home() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const { logged, user } = useSelector((state) => ({ ...state.authenticationReducer }))
  
  //local state used for the different screen displays
  const [screenDisplay, setScreenDisplay] = useState("orderHistory");

  //Route protection
  useEffect(() => {
      if(!logged) {
          history.push("/authentication");
      }
  }, [logged])

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
      <Grid container spacing={5} className={classes.container}>
        <Grid item xs={2} className={classes.filterGrid}>
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
            <Button className={classes.button} onClick={() => setScreenDisplay('orderHistory')}> Order History </Button>
            <Button className={classes.button} onClick={() => setScreenDisplay('accountConfig')}> Account Configuration</Button>
            <Box className={classes.BoxLogOut}>
              <Button className={classes.button} onClick={() => handleLogOut()}> Log Out </Button>
            </Box>
          </CardContent>
        </Grid>
        <Grid className={classes.screen} item xs={9}>
            {displayScreens()}
        </Grid>
      </Grid>
    </Container>
  );
}
