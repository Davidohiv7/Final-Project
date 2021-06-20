import { CREATE_CATEGORY, GET_CATEGORIES, ADD_URL_TO_DELETE } from '../../actions_types/admin/admin_action_types'

const initialState = {
    categories: [],
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
        default:
            return {
                ...state
            }
    }
} 

export default adminReducer