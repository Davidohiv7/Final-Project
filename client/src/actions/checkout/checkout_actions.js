// import axios from 'axios';
import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION } from '../../actions_types/checkout/checkout_actions_types'


// export function signIn(obj) {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post("http://localhost:3001/signin", obj)
//             if(response.data.data.token) {
//                 dispatch({type: SIGN_IN});
//                 localStorage.setItem('jwt', `Bearer ${response.data.data.token}`)
//             }
//         } catch (error) {
//             dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
//             setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 5000)
//         }
//     }
// }


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