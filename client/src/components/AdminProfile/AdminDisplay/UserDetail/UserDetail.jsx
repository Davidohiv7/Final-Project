import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

//Imports Material UI components:
import { Box, Paper, Typography, TextField, Button }from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './styles';
import { setRole, deleteUser } from '../../../../actions/admin/admin_actions';

export default function UserDetail({editUser, setDisplayStatus }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [editRole, setEditRole] = useState(editUser.role);
    const [open, setOpen] = useState(false);
    const [deletedOpen, setDeletedOpen] = useState(false);
    
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleSubmit = () => {
        dispatch(setRole({id: editUser.id, role: editRole}))
        setOpen(true)
    }

    const handleDelete = () => {
        dispatch(deleteUser(editUser.id));
        //setDeletedOpen(true);
        setDisplayStatus('products')
    }

    return (
        <Box className={classes.root}>
            <Box className= {classes.buttonContainer}>
                    <Button onClick={()=> setDisplayStatus('users')} className = {classes.cancel}>Cancel</Button>
                    <Button onClick={handleSubmit} className = {classes.button}>Save</Button>
                </Box>
            <Paper>
                <Typography>User ID</Typography>
                <Typography>{editUser.id}</Typography>
                <Box>
                    <Box>
                        <Typography>Name</Typography>
                        <Typography>{editUser.name}</Typography>
                    </Box>
                    <Box>
                        <Typography>Last Name</Typography>
                        <Typography>{editUser.lastName}</Typography>
                    </Box>
                    <Box>
                        <Typography>Email</Typography>
                        <Typography>{editUser.email}</Typography>
                    </Box>
                </Box>
                <Autocomplete
                    className = {classes.status}
                    id= 'statusSelector'
                    options={['customer','staff', 'admin']}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                    value = {editRole}
                    onChange={(e, v) => {
                        setEditRole(v)
                    }}
                />
                <Button onClick={handleDelete} className={classes.button}>Delete User</Button>
            </Paper>
            <Snackbar open={open} autoHideDuration={4000} onClose={()=> setOpen(false)}>
                <Alert onClose={()=> setOpen(false)} severity="success">
                The user role has been updated succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={deletedOpen} autoHideDuration={4000} onClose={() => setDeletedOpen(false)}>
                <Alert onClose={() => setDeletedOpen(false)} severity="success">
                    'The user has been deleted, redirecting to admin root profile'
                </Alert>
            </Snackbar>
        </Box>
    )
}
