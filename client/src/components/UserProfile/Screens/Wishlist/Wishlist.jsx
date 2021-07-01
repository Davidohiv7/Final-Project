import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
//Imports Material UI components:
import { Button, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography  }from '@material-ui/core'
import { Home } from '@material-ui/icons'
import useStyles from './styles';
//actions
import { getFavorites } from '../../../../actions/favorites/favorites_actions';
//components
import Item from './WishlistItem/Item'

export default function Wishlist() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state.authenticationReducer }));
    const { favorites } = useSelector((state) => ({ ...state.wishlistReducer }));

    let history = useHistory();
    
  /* eslint-disable */
    useEffect(() => {
      dispatch(getFavorites(user.email));
    }, []);
  /* eslint-enable */

    return (
      <Box className={classes.generalContainer}>
        {favorites && favorites.length > 0 ? 
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.header} align='left'>Products:</TableCell>
                  <TableCell className={classes.header} align='left'>Name</TableCell>
                  <TableCell className={classes.header} align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  favorites && favorites.map(favorite => <Item favorite={favorite} user={user} />)
                }
              </TableBody>
            </Table>
          </TableContainer>
          :
          <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
            <Typography align='center' variant="h5" color="initial"> You dont`t have any product in your wishlist, go to the home and check our incredible products</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Home />}
              className={classes.checkout}
              onClick={e => history.push("/")}
            >
              home
            </Button>
          </Box>
      }
          

      </Box>
  )
}