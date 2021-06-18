import axios from 'axios';
import { SET_CART } from '../../actions_types/cart/cart_actions_types'

export const addProductToCart = (product, quantity) => {
    const jwt = localStorage.getItem('jwt')
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/cart/add", { product, quantity}, { headers: { 'Authorization': jwt }} )
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
            const response = await axios.put("http://localhost:3001/cart/modify", { product, quantity}, { headers: { 'Authorization': jwt }} )
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
            const response = await axios.put("http://localhost:3001/cart/delete", { product }, { headers: { 'Authorization': jwt }} )
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
            const response = await axios.delete("http://localhost:3001/cart/clear", { headers: { 'Authorization': jwt }} )
            dispatch({type: SET_CART, payload: response.data.data.cart});
        } catch (error) {
            console.log(error)
        }
    }
}