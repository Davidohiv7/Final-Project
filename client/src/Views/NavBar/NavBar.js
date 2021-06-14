import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Eco, ShoppingCart, AccountCircle } from '@material-ui/icons';
import useStyles from './NavBarStyles';
import { Link } from 'react-router-dom';
import { getUserData } from '../../actions/authentication/authentication_actions'
import { SIGN_IN } from '../../actions_types/authentication/authentication_actions_types';

export default function NavBar() {
  let classes = useStyles();

  const { logged } = useSelector((state) => ({ ...state.authenticationReducer }))
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if(jwt && !logged) {
      dispatch(getUserData(jwt))
    }
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if(jwt && logged) {
      dispatch(getUserData(jwt))
    }
  }, [logged])
  
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link to="/" className={classes.link}>
              < Eco className = {
                  classes.logo
              }
              />
            <Typography variant="h3" className={classes.title}>
                Onion
            </Typography>
          </Link>
          <div className={classes.div}>
            <Link to="/cart">
                <Button className={classes.button}> 
                    <ShoppingCart/>
                </Button>
            </Link>

              {
                logged ? 
                <Link to="/user">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<AccountCircle />}
                  >
                    User
                  </Button>
                </Link>
                :
                <Link to="/authentication">
                  <Button className={classes.button}>Login/Register</Button>
                </Link>
              }
          
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

