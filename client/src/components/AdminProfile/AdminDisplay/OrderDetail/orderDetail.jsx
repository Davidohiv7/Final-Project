import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Imports Material UI components:
import { Box, Paper, Typography, TextField, Button }from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './styles';
import { setStatus } from '../../../../actions/admin/admin_actions';

export default function OrderDetail({editOrder, setDisplayStatus }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [editStatus, setEditStatus] = useState(editOrder.status);
    const [open, setOpen] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleSubmit = () => {
        dispatch(setStatus({id: editOrder.id, status: editStatus}))
        setOpen(true)
    }

    return (
        <Box className={classes.root}>
            <Box className= {classes.buttonContainer}>
                    <Button onClick={()=> setDisplayStatus('orders')} className = {classes.cancel}>Cancel</Button>
                    <Button onClick={handleSubmit} className = {classes.button}>Save</Button>
                </Box>
            <Paper>
                <Typography>Order ID</Typography>
                <Typography>{editOrder.id}</Typography>
                <Box>
                    <Box>
                        <Typography>Created At</Typography>
                        <Typography>{editOrder.createdAt}</Typography>
                    </Box>
                    <Box>
                        <Typography>Total</Typography>
                        <Typography>{editOrder.total}</Typography>
                    </Box>
                    <Box>
                        <Typography>Payment Method</Typography>
                        <Typography>{editOrder.paymentMethod}</Typography>
                    </Box>
                </Box>
                <Autocomplete
                    className = {classes.status}
                    id= 'statusSelector'
                    options={['created', 'paid', 'progress', 'cancelled', 'completed']}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                    value = {editStatus}
                    onChange={(e, v) => {
                        setEditStatus(v)
                    }}
                />
            </Paper>
            <Snackbar open={open} autoHideDuration={4000} onClose={()=> setOpen(false)}>
                <Alert onClose={()=> setOpen(false)} severity="success">
                The order has been updated succesfully!
                </Alert>
            </Snackbar>
        </Box>
    )
}
