import { SIGN_UP, SIGN_IN, GOOGLE_AUTH, AUTH_ERROR, LOG_OUT, GET_USER_DATA, SET_USER_ORDERS, INIT_TWOFA} from '../../actions_types/authentication/authentication_actions_types'

const initialState = {
    logged: false,
    authMessage: '',
    user: null,
    orders: [],
    twofa: {
        status: false,
    },
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
                user: null,
            }
        }
        case AUTH_ERROR: {
            return {
                ...state,
                authMessage: action.payload,
            }
        }
        case GET_USER_DATA: {
            return {
                ...state,
                logged: true,
                user: action.payload,
            }
        }
        case SET_USER_ORDERS: {
            return {
                ...state,
                orders: action.payload
            }
        }
        case INIT_TWOFA: {
            return {
                ...state,
                twofa: {
                    ...state.twofa,
                    status: true
                }
            }
        }
        default:
            return {
                ...state
            }
    }
} 

export default authenticationReducer