import { GET_PRODUCTS, SET_SORT } from '../actions/actions'

const initialState = {
    sortValue: '',
    products: [],
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...initialState,
                products: action.payload,
            }
        }
        case SET_SORT: {
            return {
                ...state,
                sortValue: action.payload
            }
        }
        default:
            return {...state}
    }
} 

export default reducer