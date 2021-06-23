import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Box }from '@material-ui/core'
import useStyles from './styles';
import edit from './edit.png'
import { getUsers } from '../../../../actions/admin/admin_actions';

export default function Users({ setDisplayStatus, setEditUser }) {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(getUsers())
  }, [])
  
  const { users } = useSelector((state)=> state.adminReducer)
  
  function createData(id, name, role, edit) {
    return { id, name, role, edit };
  }

  const rows = users && users.map((user) => createData(user.id, `${user.name} ${user.lastName}`, user.role, <Button onClick={() => {
    setEditUser(user)
    setDisplayStatus('userDetail')
  }}
  className= {classes.editButton}><img width='25px' src={edit}></img></Button>))
  return (
    <Box className= {classes.container}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.header} align= 'center'>User ID</TableCell>
              <TableCell className={classes.header} align="center">Name</TableCell>
              <TableCell className={classes.header} align="right">Role</TableCell>
              <TableCell className={classes.header} align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows && rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align= 'center'>{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.edit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}


