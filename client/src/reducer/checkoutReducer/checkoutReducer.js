import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION } from '../../actions_types/checkout/checkout_actions_types'

const initialState = {
    cart: [],
    subtotal: 0,
    customerInformation: null,
    paymentState: false,
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
        default:
            return {...state}
    }
} 

export default checkoutReducer