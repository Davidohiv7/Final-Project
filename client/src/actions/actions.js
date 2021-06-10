import Axios from 'axios';

export const GET_PRODUCTS = 'GetProducts';
export const SET_SORT = 'SetSort';

export function getAllProducts() {
    return (dispatch) => {
        return Axios.get("http://localhost:3001/products")
                .then(res => res.data)
                .then(res => {
                    console.log(res.data)
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