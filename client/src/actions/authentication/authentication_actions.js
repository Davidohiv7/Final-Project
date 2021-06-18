import axios from 'axios';
import { SIGN_UP, SIGN_IN, LOG_OUT, AUTH_ERROR, GET_USER_DATA } from '../../actions_types/authentication/authentication_actions_types'
import { SET_CART, } from '../../actions_types/cart/cart_actions_types'


export function signIn(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/signin", obj)
            console.log(response.data)
            if(response.data.data.token) {
                dispatch({type: SIGN_IN});
                if(response.data.data.cart) {
                    dispatch({type: SET_CART, payload: response.data.data.cart});
                }
                localStorage.removeItem('cart')
                localStorage.setItem('jwt', `Bearer ${response.data.data.token}`)
            }
        } catch (error) {
            dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
            setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 5000)
        }
    }
}

export function signUp(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/signup", obj)
            if(response.data.data.token) {
                dispatch({type: SIGN_UP});
                if(response.data.data.cart) {
                    dispatch({type: SET_CART, payload: response.data.data.cart});
                }
                localStorage.removeItem('cart')
                localStorage.setItem('jwt', `Bearer ${response.data.data.token}`)
            }
        } catch (error) {
            dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
            setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 5000)
        }
    }
}

export function getUserData(jwt) {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/user/data", { headers: { 'Authorization': jwt } })
            const data = response.data.data
            dispatch({type: GET_USER_DATA, payload: data.userData});
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
            const response = await axios.post("http://localhost:3001/googleAuth/setnewcart", data, { headers: { 'Authorization': jwt } })
            if(response.data.data.cart) {
                dispatch({type: SET_CART, payload: response.data.data.cart});
                localStorage.removeItem('cart')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function getGoogleUserCart(jwt) {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/googleAuth/getcart", { headers: { 'Authorization': jwt } })
            console.log(response)
            if(response.data.data.cart) {
                dispatch({type: SET_CART, payload: response.data.data.cart});
                localStorage.removeItem('cart')
            }
        } catch (error) {
            console.log(error)
        }
    }
}