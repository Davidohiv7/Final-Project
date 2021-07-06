import axios from 'axios';
import { SET_CART } from '../../actions_types/cart/cart_actions_types'

const apiURL = process.env.REACT_APP_API_URL

export const addProductToCart = (product, quantity) => {
    const jwt = localStorage.getItem('jwt')
    return async (dispatch) => {
        try {
            const response = await axios.post(apiURL + "/cart/add", { product, quantity}, { headers: { 'Authorization': jwt }} )
            console.log(response.data)
            dispatch({type: SET_CART, payload: response.data.data.cart});
        } catch (error) {
            console.log(error)
        }
    }
}

export const changeCartQuantity = (product, quantity) => {
    const jwt = localStorage.getItem('jwt')
    return async (dispatch) => {
        try {
            const response = await axios.put(apiURL + "/cart/modify", { product, quantity}, { headers: { 'Authorization': jwt }} )
            dispatch({type: SET_CART, payload: response.data.data.cart});
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCartProduct = (product) => {
    const jwt = localStorage.getItem('jwt')
    return async (dispatch) => {
        try {
            const response = await axios.put(apiURL + "/cart/delete", { product }, { headers: { 'Authorization': jwt }} )
            dispatch({type: SET_CART, payload: response.data.data.cart});
        } catch (error) {
            console.log(error)
        }
    }
}



export const clearCart = () => {
    const jwt = localStorage.getItem('jwt')
    return async (dispatch) => {
        try {
            const response = await axios.delete(apiURL + "/cart/clear", { headers: { 'Authorization': jwt }} )
            dispatch({type: SET_CART, payload: response.data.data.cart});
        } catch (error) {
            console.log(error)
        }
    }
}

export const setLocalCart = () => {
    let localCart = JSON.parse(localStorage.getItem('cart'))
    if(!localCart) {
        localCart = []
    }
    return {
        type: SET_CART,
        payload: localCart
    }
}
