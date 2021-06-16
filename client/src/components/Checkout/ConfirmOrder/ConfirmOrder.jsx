import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
//Imports Material UI components:
import {Box, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
//Styles
import useStyles from './styles';
//Custom functions
import { readLocalStorageCart } from '../../../assets/utils/cartFunctions'

export default function  ConfirmOrder( { activeStep, setActiveStep }) {
    
    const classes = useStyles();

    const { subtotal, cart } = useSelector((state) => ({ ...state.checkoutReducer }))

    function handleConfirmOrder(e) {
        console.log('Aqui terminaria el checkout')
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' m={2}>
            <Box mb={4}>
                <Typography variant="h3" color="primary">Confirm Order</Typography>
            </Box>
            <Box width="100%" justifyContent='center' ml={3}>
                <Typography variant="h6" className={classes.title} >
                    Order Detail
                </Typography>
                <Box className={classes.demo}>
                    <List>
                        {cart.map(ele =>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={ele.Images[0].url} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${ele.name} x ${ele.quantity}`}
                                    divider
                                />
                            </ListItem>,
                        )}
                    </List>
                </Box>

            </Box>
            <Typography variant="h5" color="primary">
                {`Total: $${subtotal.toFixed(2)}`}
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" color="primary" onClick={() => setActiveStep(activeStep - 1)} className={classes.button}>
                    Back
                </Button>

                <Button variant="contained" color="primary" onClick={(e) => handleConfirmOrder(e)}>
                    Confirm Order
                </Button>
            </Box>
            
        </Box>  
    )
}