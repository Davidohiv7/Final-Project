import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Button, Typography  }from '@material-ui/core'
import useStyles from './styles';
import { getFavorites, deleteFavorite } from '../../../../actions/favorites/favorites_actions';
import ClearIcon from '@material-ui/icons/Clear';

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

    function deleteHandler(productId, userEmail) {
      dispatch(deleteFavorite(productId, userEmail));
    }

    function renderFavs() {
      if(favorites) {
        return (
          favorites && favorites.map((favorite) => (
            <TableRow key={favorite.name}>
              <TableCell padding= '0'>
                <img width='50px' src={favorite.Images[0].url} alt={favorite.name}></img>
              </TableCell>
              <TableCell align= 'left'>{favorite.name}</TableCell>
              <TableCell align= 'right'>
                <Button onClick={() => deleteHandler(favorite.id, user.email)}>
                  <ClearIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )
      }
      
    }

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
              {renderFavs()}
            </TableBody>
          </Table>
          </TableContainer>
      </Box>
  )
}