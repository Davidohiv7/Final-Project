import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Modal, Box, Backdrop, Fade}from '@material-ui/core'
import useStyles from './styles';
import edit from './edit.png'
import { getCategories } from '../../../../actions/admin/admin_actions';

export default function Categories() {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const categories = useSelector((state)=> state.adminReducer.categories)

    useEffect(() => {
      dispatch(getCategories())
    }, [])

    function createData(name, edit) {
      return { name, edit };
    }

    
    const rows = categories && categories.map((category) => createData(category.name,<Button onClick={() => {}}className= {classes.editButton}><img width='25px' src={edit}></img></Button>))
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align= 'left'>Name</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows && rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align= 'left'>{row.name}</TableCell>
                  <TableCell align="right">{row.edit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
  )
}


