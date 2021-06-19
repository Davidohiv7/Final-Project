import axios from 'axios';
import { SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION, CONFIRM_STRIPE_PAYMENT, SET_LOADING_TRUE, 
    SET_LOADING_FALSE, SET_CHECKOUT_ERROR_MESSAGE, SET_CONFIRM_ORDER_SUCCESS_MESSAGE, SET_CONFIRM_ORDER_ERROR_MESSAGE, 
    SET_MERCADOPAGO_ORDER, CLEAR_CHECKOUT_DATA, CONFIRM_MERCADOPAGO_PAYMENT} from '../../actions_types/checkout/checkout_actions_types'
    import { CLEAR_CART} from '../../actions_types/cart/cart_actions_types'
//Custom functios
import { clearCheckoutData } from '../../assets/utils/confirmOrder'


export function confirmStripePayment(paymentData) {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING_TRUE})
        const jwt = localStorage.getItem('jwt')
        try {
            const response = await axios.post("http://localhost:3001/orders/payment/stripe", paymentData)
            if(response.data.data.paymentStatus) {
                
                const checkoutData = {payment: {
                    state: true,
                    method: "Stripe"
                }}
                
                const responseDB = await axios.post("http://localhost:3001/checkout/confirmpayment", checkoutData , { headers: { 'Authorization': jwt } })
                if(responseDB.data.data.paymentStatus.status === 'paid') {
                    dispatch({type: CONFIRM_STRIPE_PAYMENT});
                }
            }
        } catch (error) {
            dispatch({ type: SET_LOADING_FALSE})
            dispatch({type: SET_CHECKOUT_ERROR_MESSAGE, payload: error.response.data.data.message});
            setTimeout(() => dispatch({type: SET_CHECKOUT_ERROR_MESSAGE, payload: ''}), 5000)
        }
    }
}

export function confirmOrderAction(checkoutData) {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING_TRUE})
        const jwt = localStorage.getItem('jwt')
        try {
            const response = await axios.post("http://localhost:3001/orders/confirm_order", checkoutData , { headers: { 'Authorization': jwt } })
            console.log(response.data)
            if(response.data.data.result) {
                clearCheckoutData()
                dispatch({type: SET_CONFIRM_ORDER_SUCCESS_MESSAGE, payload: response.data.data.message})
                setTimeout(() => dispatch({type: CLEAR_CART}), 5000)
                setTimeout(() => dispatch({type: CLEAR_CHECKOUT_DATA}), 5000)
                setTimeout(() => dispatch({type: SET_CONFIRM_ORDER_SUCCESS_MESSAGE, payload: ''}), 5000)
            }
        } catch (error) {
            dispatch({ type: SET_LOADING_FALSE})
            if(error.response) {
                dispatch({type: SET_CONFIRM_ORDER_ERROR_MESSAGE, payload: error.response.data.data.message});
                return setTimeout(() => dispatch({type: SET_CONFIRM_ORDER_ERROR_MESSAGE, payload: ''}), 5000)
            }
            dispatch({type: SET_CONFIRM_ORDER_ERROR_MESSAGE, payload: 'We couldn`t connect to the server, sorry'});
            setTimeout(() => dispatch({type: SET_CONFIRM_ORDER_ERROR_MESSAGE, payload: ''}), 5000)
        }
    }
}


export const getCheckoutTotal = () => {
    const jwt = localStorage.getItem('jwt')
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/checkout/gettotal", { headers: { 'Authorization': jwt } })
            dispatch({type: SET_CHECKOUT_SUBTOTAL, payload: response.data.data.total});
        } catch (error) {
            console.log(error)
        }
    }
}

export const setShippingAdress = (data) => {
    const jwt = localStorage.getItem('jwt')
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/checkout/setshippingaddress", data, { headers: { 'Authorization': jwt } })
            dispatch({type: SET_CHECKOUT_CUSTOMER_INFORMATION, payload: response.data.data.shippingAddress});
        } catch (error) {
            console.log(error)
        }
    }
}

export const setMercadoPagoOrder = (order) => {
    return async (dispatch) => {
        try{
            axios.post("http://localhost:3001/create_preference", {params: order})
                .then(res => res.data)
                .then(res => {
                    console.log(res);
                    dispatch({type: SET_MERCADOPAGO_ORDER, payload: { id: res.response.id, url: res.response.init_point}})
                })
        } catch(err) {
            dispatch(err);
        }
    }
}

export const confirmMercadoPagoOrder = () => {
    return async (dispatch) => {
        const checkoutData = {payment: {
            state: true,
            method: "MercadoPago"
        }}
        const jwt = localStorage.getItem('jwt')
        
        const responseDB = await axios.post("http://localhost:3001/checkout/confirmpayment", checkoutData , { headers: { 'Authorization': jwt } })
        if(responseDB.data.data.paymentStatus.status === 'paid') {
            dispatch({type: CONFIRM_MERCADOPAGO_PAYMENT});
        }
    }
}
