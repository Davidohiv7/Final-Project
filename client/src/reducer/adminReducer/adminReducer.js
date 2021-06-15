import { CREATE_CATEGORY, GET_CATEGORIES } from '../../actions_types/admin/admin_action_types'

const initialState = {
    categories: []
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
        default:
            return {
                ...state
            }
    }
} 

export default adminReducer