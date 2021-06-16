import axios from 'axios';
import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION, CONFIRM_STRIPE_PAYMENT, SET_LOADING_TRUE, 
    SET_LOADING_FALSE, SET_CHECKOUT_ERROR_MESSAGE, SET_CONFIRM_ORDER_SUCCESS_MESSAGE, SET_CONFIRM_ORDER_ERROR_MESSAGE} from '../../actions_types/checkout/checkout_actions_types'
//Custom functios
import { clearCheckoutData } from '../../assets/utils/confirmOrder'

export function confirmStripePayment(paymentData) {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING_TRUE})
        try {
            const response = await axios.post("http://localhost:3001/orders/payment/stripe", paymentData)
            if(response.data.data.paymentStatus) {
                dispatch({type: CONFIRM_STRIPE_PAYMENT});
                const checkoutData = JSON.stringify({payment: {
                    state: true,
                    method: "Stripe"
                }})
                localStorage.setItem('checkout', checkoutData)
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
        try {
            const response = await axios.post("http://localhost:3001/orders/confirm_order", checkoutData)
            console.log(response.data.data)
            if(response.data.data.result) {
                clearCheckoutData()
                dispatch({type: SET_CONFIRM_ORDER_SUCCESS_MESSAGE, payload: response.data.data.message})
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


export const setCheckoutCart = (payload) => {
    return {
        type: SET_CHECKOUT_CART,
        payload
    }
}

export const setCheckoutSubtotal = (payload) => {
    return {
        type: SET_CHECKOUT_SUBTOTAL,
        payload
    }
}

export const setCheckoutCustomerInformation = (payload) => {
    return {
        type: SET_CHECKOUT_CUSTOMER_INFORMATION,
        payload
    }
}