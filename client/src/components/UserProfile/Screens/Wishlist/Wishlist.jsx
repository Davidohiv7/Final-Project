import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box  }from '@material-ui/core'
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
    

  /* eslint-disable */
    useEffect(() => {
      dispatch(getFavorites(user.email));
    }, []);
  /* eslint-enable */

    return (
      <Box className={classes.generalContainer}>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className=  {classes.header} align= 'left'>Products:</TableCell>
                <TableCell className=  {classes.header} align= 'left'>Name</TableCell>
                <TableCell className=  {classes.header} align= 'right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              favorites && favorites.map(favorite => <Item favorite={favorite} user={user} />)
              }
            </TableBody>
          </Table>
          </TableContainer>
          
      </Box>
  )
}