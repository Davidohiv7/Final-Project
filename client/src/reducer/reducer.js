import { GET_ALL_PRODUCTS, GET_PRODUCTS, UPDATE_SEARCHING, UPDATE_FILTER, UPDATE_SORT } from '../actions_types/actions_types'

const initialState = {
    products: [],
    nextPage: '',
    pages: '',
    page: '',
    searched: '',
    order: '',
    filter: '',
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS: {
            return {
                ...state,
                products: action.payload.products,
                nextPage: action.payload.nextPage ? action.payload.nextPage : '',
                page: action.payload.pageNumber,
                pages: action.payload.pages,
            }
        }
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload.products,
                nextPage: action.payload.nextPage ? action.payload.nextPage : '',
                page: action.payload.pageNumber,
                pages: action.payload.pages,
            }
        }
        case UPDATE_SEARCHING: {
            return {
                ...state,
                searched: action.payload,
            }
        }
        case UPDATE_SORT: {
            return {
                ...state,
                order: action.payload.order,
                filter: action.payload.filter,
            }
        }
        default:
            return {...state}
    }
} 

export default reducer