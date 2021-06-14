<<<<<<< HEAD
import { GET_CATEGORIES, GET_ALL_PRODUCTS, GET_PRODUCTS, UPDATE_SEARCHING, UPDATE_CATEOGRY, UPDATE_SORT, FAILED_SEARCH, GET_PRODUCTS_BY_CATEGORY, CREATE_CATEGORY } from '../actions_types/actions_types'

const initialState = {
    products: [],
    nextPage: '',
    pages: '',
    page: '',
    searched: '',
    order: '',
    filter: '',
    categories: [],
    category: ''
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
                categories: action.payload.categories,
            }
        }
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload.products,
                nextPage: action.payload.nextPage ? action.payload.nextPage : '',
                page: action.payload.pageNumber,
                pages: action.payload.pages,
                categories: action.payload.categories,
            }
        }
        case GET_PRODUCTS_BY_CATEGORY: {
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
        case UPDATE_CATEOGRY: {
            return {
                ...state,
                category: action.payload,
            }
        }
        case FAILED_SEARCH: {
            return {
                ...state,
                products: '',
                nextPage: '',
                page: '',
                pages: '',
                categories: '',
            }
        }
        case GET_CATEGORIES: {
            return {
            ...state,
            categories: action.payload
            }
        }
        case CREATE_CATEGORY: {
            return {
            ...state,
            categories: [...state.categories, action.payload]
            }
        }
        default:
            return {...state}
    }
} 
=======
import { combineReducers } from 'redux'
import homeReducer from './homeReducer/homeReducer'
import authenticationReducer from './authenticationReducer/authenticationReducer'

const reducer = combineReducers({ homeReducer, authenticationReducer })
>>>>>>> f9756a75e636b14fdc1b01769386c1a3b06a0f7c

export default reducer