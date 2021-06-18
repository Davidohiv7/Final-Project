import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION, CONFIRM_STRIPE_PAYMENT, SET_LOADING_TRUE, SET_LOADING_FALSE, 
    SET_CHECKOUT_ERROR_MESSAGE, SET_CONFIRM_ORDER_SUCCESS_MESSAGE, SET_CONFIRM_ORDER_ERROR_MESSAGE, SET_MERCADOPAGO_ORDER, CONFIRM_PAYMENT,
    CLEAR_CHECKOUT_DATA } from '../../actions_types/checkout/checkout_actions_types'

const initialState = {
    subtotal: 0,
    customerInformation: {
        street: '',
        neighborhood: '',
        city: '',
        zip: '',
    },
    paymentState: false,
    url: '',
    id: '',
    payment: {
        state: false,
        method: '',
        errorMessage: '',
        loading: false,
    },
    confirmOrder: {
        success: '',
        error: '',
    }
};

const checkoutReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CHECKOUT_CART: {
            return {
                ...state,
                cart: action.payload
            }
        }
        case CLEAR_CHECKOUT_DATA: {
            return {
                subtotal: 0,
                customerInformation: {
                    street: '',
                    neighborhood: '',
                    city: '',
                    zip: '',
                },
                paymentState: false,
                url: '',
                id: '',
                payment: {
                    state: false,
                    method: '',
                    errorMessage: '',
                    loading: false,
                },
                confirmOrder: {
                    success: '',
                    error: '',
                }
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
        case SET_MERCADOPAGO_ORDER: {
            return {
                ...state,
                url: action.payload.url,
                id: action.payload.id
            }
        }
        case CONFIRM_PAYMENT: {
            return {
                ...state,
                payment: {
                    ...state.payment,
                    state: true,
                    method: action.payload.paymentMethod,
                    loading: false
                },
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
        case SET_LOADING_TRUE: {
            return {
                ...state,
                payment: {
                    ...state.payment,
                    loading: true
                },
            }
        }
        case SET_LOADING_FALSE: {
            return {
                ...state,
                payment: {
                    ...state.payment,
                    loading: false
                },
            }
        }
        case SET_CHECKOUT_ERROR_MESSAGE: {
            return {
                ...state,
                payment: {
                    ...state.payment,
                    errorMessage: action.payload
                },
            }
        }
        case SET_CONFIRM_ORDER_SUCCESS_MESSAGE: {
            return {
                ...initialState,
                confirmOrder: {
                    ...initialState.confirmOrder,
                    success: action.payload
                }
            }
        }
        case SET_CONFIRM_ORDER_ERROR_MESSAGE: {
            return {
                ...state,
                confirmOrder: {
                    ...state.confirmOrder,
                    error: action.payload
                }
            }
        }
        default:
            return {...state}
    }
} 

export default checkoutReducer