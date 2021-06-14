import axios from 'axios';
import {CREATE_CATEGORY, GET_CATEGORIES, GET_ALL_PRODUCTS, GET_PRODUCTS, UPDATE_SEARCHING, UPDATE_CATEOGRY, UPDATE_SORT, FAILED_SEARCH, GET_PRODUCTS_BY_CATEGORY } from '../../actions_types/home/home_actions_types'

export function getAllProducts() {
    return (dispatch) => {
        return axios.get("http://localhost:3001/products")
                .then(res => res.data)
                .then(res => {
                    dispatch({type: GET_ALL_PRODUCTS, payload: res.data});
                })
                .catch(e => console.log(e))
    }
}

export function getProductsByCategory(obj) {
    return (dispatch) => {
        return axios.get("http://localhost:3001/products", {params: obj})
                .then(res => res.data)
                .then(res => {
                    dispatch({type: GET_PRODUCTS_BY_CATEGORY, payload: res.data})
                })
                .catch(e => dispatch({type: FAILED_SEARCH}))
    }
}

export function getProducts(obj) {
    return (dispatch) => {
        return axios.get("http://localhost:3001/products", {params: obj})
                .then(res => res.data)
                .then(res => {
                    dispatch({type: GET_PRODUCTS, payload: res.data})
                })
                .catch(e => dispatch({type: FAILED_SEARCH}))
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

export const updateCategory = (category) => {
    return {
        type: UPDATE_CATEOGRY,
        payload: category
    }
}

export function getCategories() {
    return (dispatch) => {
        return axios.get("http://localhost:3001/categories")
                .then(res => res.data)
                .then(res => {
                    dispatch({type: GET_CATEGORIES, payload: res.data})
                })
                .catch(e => dispatch({type: FAILED_SEARCH}))
    }
}

export function createCategory(name) {
    return (dispatch) => {
        return axios.post("http://localhost:3001/categories", {name: name})
                    .then(res => {
                        dispatch({type: CREATE_CATEGORY, payload: {name: name} })
                    })
                    .catch(e => console.error(e))
    }
}

