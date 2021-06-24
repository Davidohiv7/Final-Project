import React from 'react';
//Imports Material UI components:
import {Box, Stepper, Step, StepLabel } from '@material-ui/core'
//Styles
import useStyles from './styles';

export default function  CheckoutStepper({steps, activeStep}) {

    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Stepper className={classes.stepperContainer} activeStep={activeStep} alternativeLabel>
                {
                    steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>     
        </Box>  
    )
}