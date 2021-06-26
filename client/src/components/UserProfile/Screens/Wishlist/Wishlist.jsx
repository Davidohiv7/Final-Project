import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box }from '@material-ui/core'
import useStyles from './styles';
import { getFavorites } from '../../../../actions/favorites/favorites_actions';
import ClearIcon from '@material-ui/icons/Clear';

export default function Wishlist() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state.authenticationReducer }));
    const { favorites } = useSelector((state) => ({ ...state.wishlistReducer }));

  /* eslint-disable */
    useEffect(() => {
      console.log(favorites);
      dispatch(getFavorites(user.email))
    }, []);

  /* eslint-enable */
    function createData(photo, name) {
      return { photo, name };
    };

    const rows = favorites && favorites.map((favorite) => createData(<img width='50px' src={favorite.Images[0].url} alt={favorite.name}></img>,favorite.name))


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
              { rows && rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell padding= '0'>{row.photo}</TableCell>
                  <TableCell align= 'left'>{row.name}</TableCell>
                  <TableCell align= 'right'>
                      <ClearIcon/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
  )
}