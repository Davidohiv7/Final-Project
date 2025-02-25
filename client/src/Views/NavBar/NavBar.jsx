import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Badge } from '@material-ui/core';
import { Eco, ShoppingCart, AccountCircle } from '@material-ui/icons';
import useStyles from './NavBarStyles';
import { Link } from 'react-router-dom';
import { getUserData } from '../../actions/authentication/authentication_actions'

export default function NavBar() {
  let classes = useStyles();

  const { logged, user } = useSelector((state) => ({ ...state.authenticationReducer }))
  const { cart } = useSelector((state) => ({ ...state.cartReducer }))
  const dispatch = useDispatch();

  const [cartLength, setCartLength] = useState(0);

  /* eslint-disable */
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
  /* eslint-enable */
  
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
                logged && user ? 
                <Link to={user.role === 'admin' || user.role === 'staff' ? '/admin' : '/user'}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonUser}
                    startIcon={<AccountCircle />}
                  >
                    {user.role === 'admin' || user.role === 'staff' ? 'Admin' : 'User'}
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

