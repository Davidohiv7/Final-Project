import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
//Imports Material UI components:
import {Box, Typography, Button} from '@material-ui/core'
//Styles
import useStyles from './styles';
//Stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePublicKey = 'pk_test_51J2lgBHCq2LMDgLerVV4m96xBV7wqNNRERtt40b3VaU396DajyjTp0PEemMdjYN0QFG8aKUpjCsoGdgx07Jy7v6G00qWcxsvS4'
const stripePromise = loadStripe(stripePublicKey)

function StripeElements() {

    const classes = useStyles();

    const stripe = useStripe();

    const elements = useElements();

    const { cart, subtotal, customerInformation } = useSelector((state) => ({ ...state.checkoutReducer }))

    async function handleConfirmPayment(e) {
        e.preventDefault()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            billing_details:{
                address: {
                    city: customerInformation.city,
                    country: 'US',
                    line1: customerInformation.street,
                },
                email: customerInformation.email,
                name: `${customerInformation.name} ${customerInformation.lastName}`,
            },
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if(!error) console.log(paymentMethod)
        if(error) alert('Please check the card details')

    }

    return (

        <form onSubmit={(e) => handleConfirmPayment(e)}>
            <CardElement options={{
                style: {
                    base: {
                        fontSize: '16px',
                        },
                    },
                value: {
                    postalCode: customerInformation.zip,
                    }   
                }}
            />
            <Button type='submit' variant="contained" color="primary" className={classes.button}>
                Confirm Payment
            </Button>
        </form>
            
    )
}


export default function  Stripe() {
    
    const classes = useStyles();

    return (
        <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width='100%'>
            <Box my={2}>
                <Typography variant="h5" color="primary">Stripe</Typography>
            </Box>
            <Box my={2}>
                <Typography variant="body1" color="secondary.dark">Fill the card information to complete the payment</Typography>
            </Box>
            <Box width='75%'>
                <Elements stripe={stripePromise}>
                    <StripeElements/>
                </Elements>
            </Box>
        </Box>  
    )
}