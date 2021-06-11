import Axios from 'axios';
import { GET_ALL_PRODUCTS, GET_PRODUCTS, UPDATE_SEARCHING, UPDATE_FILTER, UPDATE_SORT } from '../actions_types/actions_types'

export function getAllProducts() {
    return (dispatch) => {
        return Axios.get("http://localhost:3001/products")
                .then(res => res.data)
                .then(res => {
                   dispatch({type: GET_ALL_PRODUCTS, payload: res.data});
                })
                .catch(e => console.log(e))
    }
}

export function getProducts(obj) {
    return (dispatch) => {
        return Axios.get("http://localhost:3001/products", {params: obj})
                .then(res => res.data)
                .then(res => {
                   dispatch({type: GET_PRODUCTS, payload: res.data})
                })
                .catch(e => console.log(e))
    }
}

export const updateSearching = searchedWord => {
        return {
        type: UPDATE_SEARCHING,
        payload: searchedWord
    }
}

export const updateSorting = (filter, order) => {
    return {
    type: UPDATE_SORT,
    payload: {filter, order}
}
}