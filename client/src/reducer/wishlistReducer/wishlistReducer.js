import { GET_FAVORITES } from '../../actions_types/favorites/favorites_action_types';

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
        default:
            return {
                ...state
            }
    }
}; 

export default wishlistReducer;