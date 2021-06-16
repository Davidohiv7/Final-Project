import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
//Imports Material UI components:
import {Paper, Box, Divider} from '@material-ui/core'
//Styles
import useStyles from './styles';
//Components
import Stepper from './CheckoutStepper/CheckoutStepper'
import CustomerInformation from './CustomerInformation/CustomerInformation'
import ConfirmOrder from './ConfirmOrder/ConfirmOrder'
import Payment from './Payment/Payment'


export default function Checkout({subtotal}) {

    const classes = useStyles();

    const steps = ['Customer information', 'Payment', 'Confirm order' ]
    const [activeStep, setActiveStep] = useState(0);
    

    function renderStep(activeStep) {
        if(activeStep === 0) return <CustomerInformation 
            activeStep={activeStep} 
            setActiveStep={setActiveStep} 
        />
        if(activeStep === 1) return <Payment 
            activeStep={activeStep} 
            setActiveStep={setActiveStep}
        />
        if(activeStep === 2) return <ConfirmOrder activeStep={activeStep} setActiveStep={setActiveStep}/>
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