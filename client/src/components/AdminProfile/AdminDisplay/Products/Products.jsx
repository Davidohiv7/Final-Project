import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Modal, Box, Backdrop, Fade}from '@material-ui/core'
import useStyles from './styles';
import edit from './edit.png'
import { getAllProducts } from '../../../../actions/home/home_actions';

export default function ManageProducts() {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.homeReducer.products)

    useEffect(() => {
      dispatch(getAllProducts())
    }, [])

    function createData(photo, name, price, stock, edit) {
      return { photo, name, price, stock, edit };
    }

    const rows = products && products.map((product) => createData(<img width='50px' src={product.Images[0].url}></img>,product.name, `$${product.price}`, product.stock, <Button className= {classes.editButton}><img width='25px' src={edit}></img></Button>))
    
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align= 'left'></TableCell>
                <TableCell align= 'left'>Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows && rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell padding= '0'>{row.photo}</TableCell>
                  <TableCell align= 'left'>{row.name}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">{row.edit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
  )
}


