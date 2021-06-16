import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION, CONFIRM_STRIPE_PAYMENT, SET_LOADING } from '../../actions_types/checkout/checkout_actions_types'

const initialState = {
    cart: [],
    subtotal: 0,
    customerInformation: null,
    payment: {
        state: false,
        method: '',
        errorMessage: '',
        loading: false,
    },
};

const checkoutReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CHECKOUT_CART: {
            return {
                ...state,
                cart: action.payload
            }
        }
        case SET_CHECKOUT_SUBTOTAL: {
            return {
                ...state,
                subtotal: action.payload
            }
        }
        case SET_CHECKOUT_CUSTOMER_INFORMATION: {
            return {
                ...state,
                customerInformation: action.payload
            }
        }
        case CONFIRM_STRIPE_PAYMENT: {
            return {
                ...state,
                payment: {
                    ...state.payment,
                    state: true,
                    method: 'Stripe',
                    loading: false
                },
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                payment: {
                    ...state.payment,
                    loading: true
                },
            }
        }
        default:
            return {...state}
    }
} 

export default checkoutReducer