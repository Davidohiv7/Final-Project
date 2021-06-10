import Axios from 'axios';
import { GET_ALL_PRODUCTS, GET_PRODUCTS, SET_SORT } from '../actions_types/actions_types'

export function getAllProducts() {
    return (dispatch) => {
        return Axios.get("http://localhost:3001/products")
                .then(res => res.data)
                .then(res => {
                   dispatch({type: GET_ALL_PRODUCTS, payload: res.data});
                });
    }
}

export function getProducts(obj) {
    return (dispatch) => {
        return Axios.get("http://localhost:3001/products", {params: obj})
                .then(res => res.data)
                .then(res => {
                   dispatch({type: GET_PRODUCTS, payload: res.data});
                });
    }
}

export const changeSort = value => dispatch => {
    return dispatch({
        type: SET_SORT,
        payload: value
    })
}