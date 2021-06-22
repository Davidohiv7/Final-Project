import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
//Imports Material UI components:
import {Box, Typography, Button, Avatar, Snackbar} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
//Styles
import useStyles from './styles';
//Stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
//actions
import { confirmStripePayment } from '../../../../actions/checkout/checkout_actions'

const stripePublicKey = 'pk_test_51J4RMHFCLZ4vR0JaXwIiPvw8IRjpjfkgTmDW6fQN2qSKtMme3VsfayegaFq6tdjtYCKTNI5cdVytzkjkUXTBORkN009e78k1ql'
const stripePromise = loadStripe(stripePublicKey)

function StripeElements() {

    const classes = useStyles();

    const stripe = useStripe();

    const elements = useElements();

    const dispatch = useDispatch();

    const { subtotal, customerInformation } = useSelector((state) => ({ ...state.checkoutReducer }))

    const [cardErrorSnackBar, setCardErrorSnackBar] = useState(false);

    async function handleConfirmPayment(e) {
        e.preventDefault()
        const card = elements.getElement(CardElement)
        if(card) {
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
    
            if(!error) {
                return dispatch(confirmStripePayment({subtotal: (subtotal * 100).toFixed(0), paymentId: paymentMethod.id}))
            }
            if(error) return setCardErrorSnackBar(true)
        }
        setCardErrorSnackBar(true)
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
            <Box display="flex" justifyContent="center" alignItems="center" width='100%' mt={4}>
                <Button type='submit' variant="contained" color="primary" className={classes.button} >
                    Confirm Payment
                </Button>
            </Box>
            <Snackbar open={cardErrorSnackBar} autoHideDuration={3000} onClose={() => setCardErrorSnackBar(false)} variant="filled">
                <Alert onClose={() => setCardErrorSnackBar(false)} severity="error">
                    Please check the card details
                </Alert>
            </Snackbar>
        </form>
            
    )
}


export default function  Stripe() {

    const { payment, subtotal } = useSelector((state) => ({ ...state.checkoutReducer }))

    const [paymentErrorSnackbar, setPaymentErrorSnackbar] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        if(payment.errorMessage) {
            return setPaymentErrorSnackbar(true);
        }
        if(!payment.errorMessage) {
            return setPaymentErrorSnackbar(false);
        }
    }, [payment.errorMessage])


    return (
        <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width='100%'>
            <Box my={2}>
                <Avatar 
                    src='data:image/png;base64,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'
                    variant='rounded'
                    className={classes.logo}
                />
            </Box>
            {
                payment.state ? 
                <Box mt={5} display="flex" flexDirection='column' justifyContent="center" alignItems="center">
                    <Typography variant="h3" className={classes.truePayment}> This order is already paid</Typography>
                    <Typography variant="h6"> Please proceed to confirm the order</Typography>
                </Box>
                :
                <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width='90%'>
                    <Box mt={2} mb={3}>
                        <Typography variant="body1" color="secondary.dark">Fill the card information to complete the payment</Typography>
                    </Box>
                    <Box mb={3}>
                        <Typography variant="h5" className={classes.truePayment}>Total order: {`$${subtotal}`}</Typography>
                    </Box>
                    <Box width='75%'>
                        <Elements stripe={stripePromise}>
                            <StripeElements/>
                        </Elements>
                    </Box>
                </Box>
            }

            <Snackbar open={paymentErrorSnackbar} autoHideDuration={3000} onClose={() => setPaymentErrorSnackbar(false)} variant="filled">
                <Alert onClose={() => setPaymentErrorSnackbar(false)} severity="error">
                    {payment.errorMessage}
                </Alert>
            </Snackbar>
            
            
        </Box>  
    )
}