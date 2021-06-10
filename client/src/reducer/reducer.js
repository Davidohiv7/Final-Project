import { GET_PRODUCTS } from '../actions/actions'

const initialState = {
    products: [],
    nextPage: '',
    pages: '',
    page: '',
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload.products,
                nextPage: action.payload.nextPage ? action.payload.nextPage : '',
                page: action.payload.pageNumber,
                pages: action.payload.pages,
            }
        }
        default:
            return {...state}
    }
} 

export default reducer