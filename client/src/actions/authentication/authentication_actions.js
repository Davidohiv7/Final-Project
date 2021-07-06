import axios from 'axios';
import { SIGN_UP, SIGN_IN, LOG_OUT, AUTH_ERROR, GET_USER_DATA, SET_USER_ORDERS, GOOGLE_AUTH, INIT_TWOFA, FINISH_TWOFA, FAIL_TWOFA_ATTEMPT } from '../../actions_types/authentication/authentication_actions_types'
import { SET_CART, } from '../../actions_types/cart/cart_actions_types'
import { SET_CHECKOUT_CUSTOMER_INFORMATION, CONFIRM_PAYMENT, SET_CHECKOUT_SUBTOTAL} from '../../actions_types/checkout/checkout_actions_types'

const apiURL = process.env.REACT_APP_API_URL

export function twofaSignIn(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post(apiURL +  "/signin/twofa/email", {...obj})
            const data = response.data.data
            if(data) {
                dispatch({type: INIT_TWOFA});
            }
        } catch (error) {
            if(error.response && error.response.data.data.message) {
                dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
                return setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 4000)
            }
            dispatch({type: AUTH_ERROR, payload: 'Sorry, we couldn`t connect to the server'});
            return setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 4000)
        }
    }
}

export function twofaSignIn2(obj, code) {
    const cart = JSON.parse(localStorage.getItem('cart'))
    return async (dispatch) => {
        try {
            const response = await axios.post(apiURL +  "/signin/twofa/email/confirm", {...obj, localCart: cart, code})
            if(response.data.data.token) {
                localStorage.removeItem('cart')
                localStorage.setItem('jwt', `Bearer ${response.data.data.token}`)
                dispatch({type: SIGN_IN});
                dispatch({type: FINISH_TWOFA});
                if(response.data.data.cart) {
                    dispatch({type: SET_CART, payload: response.data.data.cart});
                }
            }
        } catch (error) {
            if(error.response && error.response.data.data.message) {
                dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
                dispatch({type: FAIL_TWOFA_ATTEMPT});
                return setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 3000)
            }
            dispatch({type: AUTH_ERROR, payload: 'Sorry, we couldn`t connect to the server'});
            return setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 3000)
            
        }
    }
}

//REEMPLAZADO POR EL 2FA, NO BORRAR POR SI SE LE AGREGA EL FEATURE DE SER OPCIONAL EL 2FA
// export function signIn(obj) {
//     const cart = JSON.parse(localStorage.getItem('cart'))
//     return async (dispatch) => {
//         try {
//             const response = await axios.post(apiURL + "/signin", {...obj, localCart: cart})
//             if(response.data.data.token) {
//                 localStorage.removeItem('cart')
//                 localStorage.setItem('jwt', `Bearer ${response.data.data.token}`)
//                 dispatch({type: SIGN_IN});
//                 if(response.data.data.cart) {
//                     dispatch({type: SET_CART, payload: response.data.data.cart});
//                 }
//             }
//         } catch (error) {
//             dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
//             setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 5000)
//         }
//     }
// }

export function signUp(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post(apiURL + "/signup", obj)
            if(response.data.data.token) {
                localStorage.removeItem('cart')
                localStorage.setItem('jwt', `Bearer ${response.data.data.token}`)
                dispatch({type: SIGN_UP});
                if(response.data.data.cart) {
                    dispatch({type: SET_CART, payload: response.data.data.cart});
                }
            }
        } catch (error) {
            if(error.response && error.response.data.data.message) {
                dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
                return setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 4000)
            }
            dispatch({type: AUTH_ERROR, payload: 'Sorry, we couldn`t connect to the server'});
            return setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 4000)
        }
    }
}

export function getUserData(jwt) {
    return async (dispatch) => {
        try {
            console.log()
            const response = await axios.get(apiURL + "/user/data", { headers: { 'Authorization': jwt } })
            const data = response.data.data
            await dispatch({type: GET_USER_DATA, payload: data.userData});
            if(data.orders) {
                dispatch({type: SET_USER_ORDERS, payload: data.orders});
            }
            if(data.shippingAddress) {
                dispatch({type: SET_CHECKOUT_CUSTOMER_INFORMATION, payload: data.shippingAddress});
            }
            if(data.total) {
                dispatch({type: SET_CHECKOUT_SUBTOTAL, payload: data.total});
            }
            if(data.paymentStatus?.status === 'paid') {
                dispatch({type: CONFIRM_PAYMENT, payload: data.paymentStatus});
            }
            if(data.cart) {
                return dispatch({type: SET_CART, payload: data.cart});
            }
            dispatch({type: SET_CART, payload: []});
        } catch (error) {
            console.log(error)
        }
    }
}

export const logOut = () => {
    return (dispatch) => {
        dispatch({type: LOG_OUT});
        dispatch({type: SET_CART, payload: []});
    }
}

export function setGoogleUserNewCart(jwt, cart) {
    const data = {cart}
    return async (dispatch) => {
        try {
            const response = await axios.post(apiURL + "/googleAuth/setnewcart", data, { headers: { 'Authorization': jwt } })
            if(response) {
                dispatch({type: GOOGLE_AUTH})
                localStorage.removeItem('cart')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function getGoogleUserCart(jwt) {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    return async (dispatch) => {
        try {
            //CUANDO NO HAY UNA ORDEN CREADA NO RESPONDE AQUI
            const response = await axios.post(apiURL + "/googleAuth/getcart", {localCart}, { headers: { 'Authorization': jwt } })
            if(response) {
                dispatch({type: GOOGLE_AUTH})
                localStorage.removeItem('cart')
            }
        } catch (error) {
            console.log(error)
        }
    }
}