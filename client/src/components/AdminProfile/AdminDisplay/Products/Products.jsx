import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Box }from '@material-ui/core'
import useStyles from './styles';
import edit from './edit.png'
import { getAllProducts } from '../../../../actions/home/home_actions';

export default function Products({ setDisplayStatus, setEditProduct  }) {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.homeReducer.products)
  /* eslint-disable */
    useEffect(() => {
      dispatch(getAllProducts())
    }, [])
  /* eslint-enable */
    function createData(photo, name, price, stock, edit) {
      return { photo, name, price, stock, edit };
    }

    
    const rows = products && products.map((product) => createData(<img width='50px' src={product.Images[0].url} alt={product.name}></img>,product.name, `$${product.price}`, product.stock, <Button onClick={() => {
      setDisplayStatus('edit_product')
      setEditProduct(product)
    }}
    className= {classes.editButton}><img width='25px' src={edit} alt="edit button"></img></Button>))
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className=  {classes.header} align= 'left'></TableCell>
                <TableCell className=  {classes.header} align= 'left'>Name</TableCell>
                <TableCell className=  {classes.header} align="center">Price</TableCell>
                <TableCell className=  {classes.header} align="center">Stock</TableCell>
                <TableCell className=  {classes.header} align="center">Edit</TableCell>
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


