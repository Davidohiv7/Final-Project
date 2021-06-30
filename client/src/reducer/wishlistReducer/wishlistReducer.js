import { GET_FAVORITES, ADD_TO_FAVORITES, DELETE_FAVORITE } from '../../actions_types/favorites/favorites_action_types';

const initialState = {
    favorites: [],
};

const wishlistReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_FAVORITES: {
            return {
                ...state,
                favorites: action.payload,
            }
        }
        case ADD_TO_FAVORITES: {
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            }
        }
        case DELETE_FAVORITE: {
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite.id !== action.payload),
            }
        }
        default:
            return {
                ...state
            }
    }
}; 

export default wishlistReducer;