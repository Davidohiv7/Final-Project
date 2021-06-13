import { GET_ALL_PRODUCTS, GET_PRODUCTS, UPDATE_SEARCHING, UPDATE_CATEOGRY, UPDATE_SORT, FAILED_SEARCH, GET_PRODUCTS_BY_CATEGORY } from '../../actions_types/actions_types'

const initialState = {
    products: [],
    nextPage: '',
    pages: '',
    page: '',
    searched: '',
    order: 'ASC',
    filter: 'name',
    categories: [],
    category: ''
};

const homeReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS: {
            return {
                ...state,
                products: action.payload.products,
                nextPage: action.payload.nextPage ? action.payload.nextPage : '',
                page: action.payload.pageNumber,
                pages: action.payload.pages,
                categories: action.payload.categories,
                order: 'ASC',
                filter: 'name',
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
        default:
            return {...state}
    }
} 

export default homeReducer