import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Imports Material UI components:
import {Box, Typography, Button} from '@material-ui/core';
//Styles
import useStyles from './styles';
//Custom functions
import { readLocalStorageCart } from '../../../../assets/utils/cartFunctions';
//Actions
import { setMercadoPagoOrder } from '../../../../actions/checkout/checkout_actions';

export default function  MercadoPagoIntegration() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { url, id } = useSelector((state) => ({ ...state.checkoutReducer }))

    let cartProducts = readLocalStorageCart();

    useEffect(() => {
        if (url && url != '') {
            const Mercadopago = window.open(url);
        }
    }, [url])

    function getMercadoPagoOrder() {
        dispatch(setMercadoPagoOrder(cartProducts));
    }
  



    return (
        <Box display="flex" justifyContent="center" alignItems="center" width='100%'>
            <Typography variant="h5" color="primary">MercadoPago</Typography>
            <Button type='submit' variant="contained" color="primary" className={classes.button} onClick={() => getMercadoPagoOrder()}>
                Go to MercadoPago
            </Button>
        </Box>  
    )
}