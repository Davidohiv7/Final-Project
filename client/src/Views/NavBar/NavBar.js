import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Badge } from '@material-ui/core';
import { Eco, ShoppingCart, AccountCircle } from '@material-ui/icons';
import useStyles from './NavBarStyles';
import { Link } from 'react-router-dom';
import { getUserData } from '../../actions/authentication/authentication_actions'
import { SIGN_IN } from '../../actions_types/authentication/authentication_actions_types';
import { CONFIRM_STRIPE_PAYMENT, SET_CHECKOUT_CUSTOMER_INFORMATION } from '../../actions_types/checkout/checkout_actions_types';

export default function NavBar() {
  let classes = useStyles();

  const { logged } = useSelector((state) => ({ ...state.authenticationReducer }))
  const { cart } = useSelector((state) => ({ ...state.cartReducer }))
  const dispatch = useDispatch();

  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    setCartLength(cart.length)
    if(logged) {
      return setCartLength(cart.length)
    }
    const localCart = JSON.parse(localStorage.getItem('cart'))
    if(localCart) {
      setCartLength(localCart.length)
    }
  }, [cart])


  useEffect(() => {
    setCartLength(cart.length)
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
              <Badge color="error" badgeContent={cartLength}>
                  <Button className={classes.button}> 
                      <ShoppingCart/>
                  </Button>
                </Badge>
            </Link>

              {
                logged ? 
                <Link to="/user">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonUser}
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

