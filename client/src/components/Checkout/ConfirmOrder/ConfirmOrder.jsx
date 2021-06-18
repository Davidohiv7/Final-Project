import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//Imports Material UI components:
import {Box, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
//Styles
import useStyles from './styles';
//Action
import { confirmOrderAction } from '../../../actions/checkout/checkout_actions'

export default function  ConfirmOrder( { activeStep, setActiveStep }) {
    
    const classes = useStyles();

    const dispatch = useDispatch();

    let history = useHistory();

    const { subtotal, payment, customerInformation, confirmOrder } = useSelector((state) => ({ ...state.checkoutReducer }))
    const { cart } = useSelector((state) => ({ ...state.cartReducer }))
    const [confirmOrderSuccessSnackbar, setConfirmOrderSuccessSnackbar] = useState(false);
    const [confirmOrderErrorSnackbar, setConfirmOrderErrorSnackbar] = useState(false);


    function handleConfirmOrder(e) {
        dispatch(confirmOrderAction({ subtotal, cart, customerInformation }));
    }

    useEffect(() => {
        if(confirmOrder.success) {
            setConfirmOrderSuccessSnackbar(true);
            return setTimeout(() => history.push('/'), 4000)
        }
    }, [confirmOrder.success])

    useEffect(() => {
        if(confirmOrder.error) {
            return setConfirmOrderErrorSnackbar(true);
        }
    }, [confirmOrder.error])

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' m={2}>
            <Box mb={1}>
                <Typography variant="h3" color="primary">Confirm Order</Typography>
            </Box>

            {
                confirmOrder.success ? 
                <Box mt={8} isplay="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h3" align='center' className={classes.confirmOrderSuccess}>Your order is confirmed, thank you.</Typography>
                </Box>
                :
                <Box>
                    <Box width="100%" justifyContent='center' ml={3}>
                        <Typography variant="h6" className={classes.title} >
                            Order Detail
                        </Typography>
                        <Box className={classes.demo}>
                            <List className={classes.list}>
                                {cart.map(ele =>
                                    <ListItem divider>
                                        <ListItemAvatar>
                                            <Avatar src={ele.Images[0].url} />
                                        </ListItemAvatar>
                                        <ListItemText primary={`${ele.name}`} secondary={`Quantity x ${ele.quantity}`}/>
                                    </ListItem>,
                                )}
                            </List>
                        </Box>

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column'>
                        <Typography variant="h5" color="default">
                                {`Payment status: ${payment.state ? 'Paid' : 'Pending'} - Method: ${payment.method}`}
                            </Typography>
                        <Typography variant="h5" color="default">{`Total: $${subtotal}`}</Typography>
                    </Box>
                
                    <Box display="flex" justifyContent="center" alignItems="center" >
                        <Button variant="contained" color="primary" onClick={() => setActiveStep(activeStep - 1)} className={classes.button}>
                            Back
                        </Button>

                        <Button variant="contained" color="primary" onClick={(e) => handleConfirmOrder(e)}>
                            Confirm Order
                        </Button>
                    </Box>
                </Box>
            }

            <Snackbar open={confirmOrderSuccessSnackbar} autoHideDuration={3000} onClose={() => setConfirmOrderSuccessSnackbar(false)} variant="filled">
                <Alert onClose={() => setConfirmOrderSuccessSnackbar(false)} severity="success">
                    {confirmOrder.success}
                </Alert>
            </Snackbar>

            <Snackbar open={confirmOrderErrorSnackbar} autoHideDuration={3000} onClose={() => setConfirmOrderErrorSnackbar(false)} variant="filled">
                <Alert onClose={() => setConfirmOrderErrorSnackbar(false)} severity="error">
                    {confirmOrder.error}
                </Alert>
            </Snackbar>
            
        </Box>  
    )
}