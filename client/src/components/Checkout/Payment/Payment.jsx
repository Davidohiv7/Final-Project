import React from 'react';
//Imports Material UI components:
import {Box, Typography, Button} from '@material-ui/core'
//Styles
import useStyles from './styles';

export default function  Payment({activeStep, setActiveStep, customerInformation, cart, subtotal}) {

    const classes = useStyles();

    function handleConfirmClick() {
        setActiveStep(activeStep + 1)
        console.log(customerInformation, cart, subtotal) 
    }

    return (
        <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
            <Typography variant="h3" color="primary">Payment</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" color="primary" onClick={() => setActiveStep(activeStep - 1)} className={classes.button}>
                    Back
                </Button>

                <Button variant="contained" color="primary" onClick={() => handleConfirmClick()} className={classes.button}>
                    Confirm Payment
                </Button>
            </Box>
        </Box>  
    )
}