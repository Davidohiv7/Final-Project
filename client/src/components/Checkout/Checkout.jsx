import React, { useState } from 'react';
//Imports Material UI components:
import {Paper, Box, Typography, Divider} from '@material-ui/core'
//Imports Material UI icons:
import { Star } from '@material-ui/icons';
//Styles
import useStyles from './styles';
//Components
import Stepper from './CheckoutStepper/CheckoutStepper'
import CustomerInformation from './CustomerInformation/CustomerInformation'
import ConfirmOrder from './ConfirmOrder/ConfirmOrder'
import Payment from './Payment/Payment'

export default function Checkout({ cart, subtotal }) {

    const classes = useStyles();

    const steps = ['Customer information', 'Payment', 'Confirm order' ]
    const [activeStep, setActiveStep] = React.useState(0);
    const [customerInformation, setCustomerInformation] = React.useState({
        name: '',
        lastName: '',
        email: '',
        street: '',
        neighborhood: '',
        city: '',
        zip: '',
    });

    function renderStep(activeStep) {
        if(activeStep === 0) return <CustomerInformation 
            activeStep={activeStep} 
            setActiveStep={setActiveStep} 
            customerInformation={customerInformation}
            setCustomerInformation={setCustomerInformation} 
        />
        if(activeStep === 1) return <Payment 
            activeStep={activeStep} 
            setActiveStep={setActiveStep}
            customerInformation={customerInformation}
            cart={cart}
            subtotal={subtotal}
        />
        if(activeStep === 2) return <ConfirmOrder subtotal={subtotal} activeStep={activeStep} setActiveStep={setActiveStep}/>
    }

    return (
        <Paper className={classes.root} elevation={24} variant='elevation' >
            <Box p={2} className={classes.container} display="flex" flexDirection='column' justifyContent="center" alignItems="center" >
                <Box  className={classes.components} >
                    {
                        renderStep(activeStep)
                    }
                </Box>
                <Divider className={classes.divider}/>
                <Box className={classes.stepper} >
                    <Stepper steps={steps} activeStep={activeStep}/>
                </Box>
            </Box>     
        </Paper>             
    )
}