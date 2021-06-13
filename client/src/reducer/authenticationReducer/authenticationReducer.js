import { SIGN_UP, SIGN_IN } from '../../actions_types/authentication/authentication_actions_types'

const initialState = {
    logged: false,
};

const authenticationReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGN_IN: {
            return {
                ...state,
                logged: true,
            }
        }
        case SIGN_UP: {
            return {
                ...state,
                logged: true,
            }
        }
        default:
            return {
                ...state
            }
    }
} 

export default authenticationReducer