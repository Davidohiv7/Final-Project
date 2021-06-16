import axios from 'axios';
import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION, CONFIRM_STRIPE_PAYMENT, SET_LOADING } from '../../actions_types/checkout/checkout_actions_types'


export function confirmStripePayment(paymentData) {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING})
        try {
            const response = await axios.post("http://localhost:3001/orders/payment/stripe", paymentData)
            if(response.data.data.paymentStatus) {
                dispatch({type: CONFIRM_STRIPE_PAYMENT});
            }
        } catch (error) {
            console.log(error.response.data.data.message)
            // dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
            // setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 5000)
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