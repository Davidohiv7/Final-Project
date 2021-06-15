import React from 'react';
//Imports Material UI components:
import {Box, Typography, Button} from '@material-ui/core'
//Styles
import useStyles from './styles';

export default function  ConfirmOrder({setActiveStep}) {

    const classes = useStyles();

    function handleConfirmOrder(e) {
        console.log('Aqui terminaria el checkout')
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h3" color="initial">Confirm Order</Typography> 
            <Button variant="contained" color="primary" onClick={(e) => handleConfirmOrder(e)}>
              Confirm Order
            </Button>
        </Box>  
    )
}