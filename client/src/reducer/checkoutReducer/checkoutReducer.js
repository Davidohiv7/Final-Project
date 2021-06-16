import { SET_CHECKOUT_CART, SET_CHECKOUT_SUBTOTAL, SET_CHECKOUT_CUSTOMER_INFORMATION, SET_MERCADOPAGO_ORDER } from '../../actions_types/checkout/checkout_actions_types'

const initialState = {
    cart: [],
    subtotal: 0,
    customerInformation: null,
    paymentState: false,
    url: '',
    id: ''
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
        case SET_MERCADOPAGO_ORDER: {
            return {
                ...state,
                url: action.payload.url,
                id: action.payload.id
            }
        }
        default:
            return {...state}
    }
} 

export default checkoutReducer