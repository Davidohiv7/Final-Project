import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Box }from '@material-ui/core'
import useStyles from './styles';
import { getAllProducts } from '../../../../actions/home/home_actions';
import ClearIcon from '@material-ui/icons/Clear';

export default function Wishlist() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.homeReducer.products)

  /* eslint-disable */
    useEffect(() => {
      dispatch(getAllProducts())
    }, [])

  /* eslint-enable */
    function createData(photo, name) {
      return { photo, name };
    }

    
    const rows = products && products.map((product) => createData(<img width='50px' src={product.Images[0].url} alt={product.name}></img>,product.name))


    return (
      <Box>
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