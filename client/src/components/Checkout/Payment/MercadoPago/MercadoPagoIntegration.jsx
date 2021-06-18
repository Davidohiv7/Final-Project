import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Imports Material UI components:
import { Box, Button, Typography } from '@material-ui/core';
//Styles
import useStyles from './styles';
//Actions
import { setMercadoPagoOrder } from '../../../../actions/checkout/checkout_actions';


export default function  MercadoPagoIntegration() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { url, subtotal } = useSelector((state) => ({ ...state.checkoutReducer }))
    const { cart } = useSelector((state) => ({ ...state.cartReducer }))

    useEffect(() => {
        if (url && url != '') {
            const Mercadopago = window.open(url);
        }
    }, [url])

    function getMercadoPagoOrder() {
        dispatch(setMercadoPagoOrder(cart));
    }
  



    return (
        <> 
            <Box display="flex" flexDirection='column' marginTop='30px' justifyContent="center" alignItems="center" width='100%'>
                <Typography variant="h5" className={classes.truePayment}>Total order: {`$${subtotal}`}</Typography>
                <Typography variant="h6"  color='common-black'>Go to MercadoPago:</Typography>
                <Button type='submit' variant="contained" className={classes.button} onClick={() => getMercadoPagoOrder()}>
                    <img src='./mercadopago-logo.png' />
                </Button>
            </Box>  
        
        </>
    )
}