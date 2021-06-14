import { SIGN_UP, SIGN_IN, GOOGLE_AUTH, AUTH_ERROR, LOG_OUT } from '../../actions_types/authentication/authentication_actions_types'

const initialState = {
    logged: false,
    authMessage: '',
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
        case GOOGLE_AUTH: {
            return {
                ...state,
                logged: true,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                logged: false,
            }
        }
        case AUTH_ERROR: {
            return {
                ...state,
                authMessage: action.payload,
            }
        }
        default:
            return {
                ...state
            }
    }
} 

export default authenticationReducer