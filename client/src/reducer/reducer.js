import {GET_PRODUCTS} from '../actions/actions'

const initialState = {
    products: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...initialState,
                products: action.payload,
            }
        }
        default:
            return {...state}
    }
} 

export default reducer