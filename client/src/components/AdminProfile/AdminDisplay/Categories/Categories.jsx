import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Box }from '@material-ui/core'
import useStyles from './styles';
import deleteIcon from './deleteIcon.png';
import { getCategories, deleteCategory } from '../../../../actions/admin/admin_actions';

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
    
    const rows = categories && categories.map((category) => createData(category.name,<Button onClick={() => {
      dispatch(deleteCategory(category.name))
      dispatch(getCategories())
      dispatch(getCategories())
    }}className= {classes.editButton}><img width='25px' src={deleteIcon} alt="Delete Icon"></img></Button>))
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.header} align= 'left'>Name</TableCell>
                <TableCell className={classes.header} align="right">Delete</TableCell>
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


