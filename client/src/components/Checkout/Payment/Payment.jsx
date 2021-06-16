import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
//Imports Material UI components:
import {Box, Typography, Button, Tab, Tabs, Divider} from '@material-ui/core'
//Styles
import useStyles from './styles';
//Components
import Stripe from './Stripe/Stripe';
import MercadoPagoIntegration from './MercadoPago/MercadoPagoIntegration';

export default function  Payment({activeStep, setActiveStep }) {

    const classes = useStyles();

    const { paymentState } = useSelector((state) => ({ ...state.checkoutReducer }))

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    function handleConfirmClick() {
        if(paymentState) return setActiveStep(activeStep + 1)
        alert('You haven`t pay this order')
    }

    function renderTap(selectedTab) {
        if(selectedTab === 0) return <Stripe/>
        if(selectedTab === 1) return <MercadoPagoIntegration/>
    }
    

    return (
        <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width='100%'>
            <Typography variant="h3" color="primary">Payment</Typography>

            <Box width='100%' height='370px'>

                <Tabs value={selectedTab} onChange={handleTabChange} width='100%' centered>
                    <Tab label="Stripe" />
                    <Tab label="MercadoPago" />
                </Tabs>

                {
                    renderTap(selectedTab)
                }
        
            </Box>  

            <Box width='100%'>
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" color="primary" onClick={() => setActiveStep(activeStep - 1)} className={classes.button}>
                    Back
                </Button>

                <Button variant="contained" color="primary" onClick={() => handleConfirmClick()} className={classes.button}>
                    Next
                </Button>
            </Box>
        </Box>  
    )
}