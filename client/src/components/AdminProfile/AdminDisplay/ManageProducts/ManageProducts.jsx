import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Modal, Box, Backdrop, Fade}from '@material-ui/core'
import useStyles from './styles';
import { getAllProducts } from '../../../../actions/home/home_actions';

export default function ManageProducts() {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.homeReducer.products)

    useEffect(() => {
      dispatch(getAllProducts())
    }, [])

    function createData(name, createdAt, updatedAt, edit) {
      return { name, createdAt, updatedAt, edit};
    }
    
    const rows = products.map((product) => createData(product.name, product.createdAt, product.updatedAt, <Button className= {classes.editButton}>Edit</Button>))
    
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Updated At</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">{row.updatedAt}</TableCell>
                  <TableCell align="right">{row.edit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
  )
}


