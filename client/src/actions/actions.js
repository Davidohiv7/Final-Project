
export const GET_PRODUCTS = 'GetProducts';
export const SET_SORT = 'SetSort';

export function getAllProducts() {
    // return (dispatch) => {
    //     return Axios.get(url)
    //             .then(res => res.data)
    //             .then(res => {
    //                dispatch({type: GET_PRODUCTS, payload: res});
    //             });
    // }
}

export const changeSort = value => dispatch => {
    return dispatch({
        type: SET_SORT,
        payload: value
    })
}