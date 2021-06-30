import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Imports Material UI components:
import { Box, Button, Typography, Avatar } from '@material-ui/core';
//Styles
import useStyles from './styles';
//Actions
import { setMercadoPagoOrder } from '../../../../actions/checkout/checkout_actions';


export default function  MercadoPagoIntegration() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { url, subtotal, payment } = useSelector((state) => ({ ...state.checkoutReducer }))
    const { cart } = useSelector((state) => ({ ...state.cartReducer }))
    /* eslint-disable */
    useEffect(() => {
        if (url && url !== '') {
            const Mercadopago = window.open(url);
        }
    }, [url])
    /* eslint-enable */
    function getMercadoPagoOrder() {
        dispatch(setMercadoPagoOrder(cart));
    }

    return (
        <> 
            <Box display="flex" flexDirection='column' marginTop='30px' justifyContent="center" alignItems="center" width='100%'>
                {
                    payment.state ? 
                    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width='100%'>
                        <Avatar 
                        src='https://seeklogo.com/images/M/mercado-pago-logo-CC340D0497-seeklogo.com.png'
                        variant='rounded'
                        className={classes.logo}
                        />
                        <Box mt={5} display="flex" flexDirection='column' justifyContent="center" alignItems="center">
                            <Typography variant="h3" className={classes.truePayment}> This order is already paid</Typography>
                            <Typography variant="h6"> Please proceed to confirm the order</Typography>
                        </Box> 
                    </Box>
                    :
                    <Box>
                        <Typography variant="h5" className={classes.truePayment}>Total order: {`$${subtotal}`}</Typography>
                        <Typography variant="h6"  color='common-black'>Go to MercadoPago:</Typography>
                        <Button type='submit' variant="contained" className={classes.button} onClick={() => getMercadoPagoOrder()}>
                            <img src='./mercadopago-logo.png' alt="Mercado Pago Logo"/>
                        </Button>
                    </Box>
                }
            </Box>  
        
        </>
    )
}