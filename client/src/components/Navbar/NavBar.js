import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Eco, ShoppingCart } from '@material-ui/icons';
import useStyles from './NavBarStyles';
import { Link } from 'react-router-dom'

export default function NavBar() {
  const classes = useStyles();

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
            <Link to="/cart">
                <Button className={classes.button}> 
                    <ShoppingCart/>
                </Button>
            </Link>
            <Button className={classes.button}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

