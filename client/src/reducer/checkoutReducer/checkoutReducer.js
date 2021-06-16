<<<<<<< HEAD
import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION, SET_MERCADOPAGO_ORDER } from '../../actions_types/checkout/checkout_actions_types'
=======
import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION, CONFIRM_STRIPE_PAYMENT, SET_LOADING_TRUE, SET_LOADING_FALSE, 
    SET_CHECKOUT_ERROR_MESSAGE, SET_CONFIRM_ORDER_SUCCESS_MESSAGE, SET_CONFIRM_ORDER_ERROR_MESSAGE } from '../../actions_types/checkout/checkout_actions_types'
>>>>>>> 772c413c3b8e0d161dc5a0a258d4a17602dbcc87

const initialState = {
    cart: [],
    subtotal: 0,
    customerInformation: null,
<<<<<<< HEAD
    paymentState: false,
    url: '',
    id: ''
=======
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
>>>>>>> 772c413c3b8e0d161dc5a0a258d4a17602dbcc87
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
<<<<<<< HEAD
        case SET_MERCADOPAGO_ORDER: {
            return {
                ...state,
                url: action.payload.url,
                id: action.payload.id
=======
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
>>>>>>> 772c413c3b8e0d161dc5a0a258d4a17602dbcc87
            }
        }
        default:
            return {...state}
    }
} 

export default checkoutReducer