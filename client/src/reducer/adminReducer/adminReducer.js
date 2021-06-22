import { CREATE_CATEGORY, GET_CATEGORIES, ADD_URL_TO_DELETE, GET_ORDERS } from '../../actions_types/admin/admin_action_types'

const initialState = {
    categories: [],
    orders: [],
    nextPage: '',
    pages: '',
    page: '',
    imagesToDelete: []
};

const adminReducer = (state = initialState, action = {}) => {
    switch (action.type) {
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
    case ADD_URL_TO_DELETE: {
        return {
            ...state,
            imagesToDelete: [...state.imagesToDelete, action.payload]
        }
    }
    case GET_ORDERS: {
        return {
            ...state,
            orders: action.payload.data.orders,
            nextPage: action.payload.data.nextPage ? action.payload.data.nextPage : '',
            page: action.payload.data.page,
            pages: action.payload.data.pages
        }
    }
        default:
            return {
                ...state
            }
    }
} 

export default adminReducer