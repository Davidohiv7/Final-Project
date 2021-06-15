import React from 'react';
//Imports Material UI components:
import {Box, Typography, Button} from '@material-ui/core'
//Styles
import useStyles from './styles';

export default function  Payment({activeStep, setActiveStep}) {

    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h3" color="initial">Payment</Typography>
            <Button variant="contained" color="primary" onClick={() => setActiveStep(activeStep + 1)}>
              Confirm Payment
            </Button>
        </Box>  
    )
}