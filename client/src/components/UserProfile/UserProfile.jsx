//react imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// Material UI imports
import {Grid, Container, CardContent, Typography, Button, Box, Dialog, DialogTitle, DialogContent, FormControl, Select, Input, DialogActions} from "@material-ui/core";
import useStyles from "./styles";
import { AccountBoxRounded } from '@material-ui/icons';
//Components imports
import UserOrders from "./Screens/UserOrders/UserOrders";
import UserInfo from "./Screens/UserInfo/UserInfo";
import Wishlist from './Screens/Wishlist/Wishlist';

import { logOut } from '../../actions/authentication/authentication_actions'





export default function Home() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const { logged, user } = useSelector((state) => ({ ...state.authenticationReducer }))
  
  //local state used for the different screen displays
  const [screenDisplay, setScreenDisplay] = useState("accountConfig");
  const [open, setOpen] = useState(false);

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
    if(screenDisplay==='wishlist') return (<Wishlist/>)
  }

  function handleLogOut() {
    localStorage.removeItem('jwt')
    dispatch(logOut())
    history.push("/");
  }

  //RESPONSIVE SECTOR -------

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    //--------------


  return (
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 0, sm: 4 }} className={classes.container}>
        <Grid item sm={2} className={classes.filterGrid}>
          <CardContent align="center">
            <Typography
              variant="h5" color="secondary" display='inline'
            >
              {`${user && user.name} ${user && user.lastName}`}
            </Typography>
            <AccountBoxRounded className={classes.profilePic} />
            <Button className={classes.button} onClick={() => setScreenDisplay('accountConfig')}> Account Information</Button>
            <Button className={classes.button} onClick={() => setScreenDisplay('orderHistory')}> Order History </Button>
            <Button className={classes.button} onClick={() => setScreenDisplay('wishlist')}> Wishlist </Button>
            <Box className={classes.BoxLogOut}>
              <Button className={classes.button} onClick={() => handleLogOut()}> Log Out </Button>
            </Box>
          </CardContent>
        </Grid>

        {/*This displays only in mobile*/}
        <Grid item xs={12} className={classes.filter_responsive} >
          <Box className={classes.box_responsive} boxShadow={4}>
            <Button onClick={() => handleClickOpen()} className={classes.button}>Select Screen</Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={() => handleClose()}>
              <DialogTitle>Select Screen</DialogTitle>
              <DialogContent>
                <form className={classes.responsive_container}>
                  <FormControl className={classes.formControl}>
                    <Select
                      native
                      input={<Input id="demo-dialog-native" />}
                    >
                      <option onClick={() => setScreenDisplay('accountConfig')}> Account Information</option>) :
                      <option onClick={() => setScreenDisplay('orderHistory')}> Order History </option>) :
                      <option onClick={() => setScreenDisplay('whishlist')}> Wishlist </option>) :
                    </Select>
                  </FormControl>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
            <Button className={classes.button} onClick={() => handleLogOut()}> Log Out </Button>
          </Box>
        </Grid>
        {/*This displays only in mobile*/}
        
        <Grid item xs={12} sm={9}>
            {displayScreens()}
        </Grid>
      </Grid>
    </Container>
  );
}
