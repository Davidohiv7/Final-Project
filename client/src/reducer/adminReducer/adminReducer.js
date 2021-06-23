import { CREATE_CATEGORY, GET_CATEGORIES, ADD_URL_TO_DELETE, GET_ORDERS, GET_USERS } from '../../actions_types/admin/admin_action_types'

const initialState = {
    categories: [],
    categoriesPages: '',
    categoriesPage: '',
    orders: [],
    orderPages: '',
    orderPage: '',
    users: [],
    userPages: '',
    userPage: '',
    imagesToDelete: []
};

const adminReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_CATEGORIES: {
        return {
            ...state,
            categories: action.payload.categories,
            categoriesPages: action.payload.pages,
            categoriesPage: action.payload.page,
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
            orderPage: action.payload.data.page,
            orderPages: action.payload.data.pages
        }
    }
    case GET_USERS: {
        return {
            ...state,
            users: action.payload.data.users,
            userPage: action.payload.data.page,
            userPages: action.payload.data.pages
        }
    }
        default:
            return {
                ...state
            }
    }
} 

export default adminReducer