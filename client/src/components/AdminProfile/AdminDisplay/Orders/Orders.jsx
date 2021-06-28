import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Box }from '@material-ui/core'
import useStyles from './styles';
import edit from './edit.png'
import { getOrders } from '../../../../actions/admin/admin_actions';

export default function Orders({ setDisplayStatus, setEditOrder }) {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  
  /* eslint-disable */
  useEffect(() => {
    dispatch(getOrders())
  }, [])
  /* eslint-enable */
  
  const { orders } = useSelector((state)=> state.adminReducer)
  
  function createData(id, total, status, edit) {
    return { id, total, status, edit };
  }

  const rows = orders && orders.map((order) => createData(order.id, order.total, order.status, <Button onClick={() => {
    setEditOrder(order)
    setDisplayStatus('orderDetail')
  }}
  className= {classes.editButton}><img width='25px' src={edit} alt="edit icon"></img></Button>))
  return (
    <Box className= {classes.container}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.header} align= 'center'>Order ID</TableCell>
              <TableCell className={classes.header} align="center">Total</TableCell>
              <TableCell className={classes.header} align="right">Status</TableCell>
              <TableCell className={classes.header} align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows && rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align= 'center'>{row.id}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.edit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}


