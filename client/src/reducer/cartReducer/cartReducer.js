import { SET_CART ,CHANGE_CART_QUANTITY, DELETE_CART_PRODUCT, ADD_CART_PRODUCT, CLEAR_CART } from '../../actions_types/cart/cart_actions_types'

const initialState = {
    cart: []
};

const cartReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case SET_CART: {
        return {
            ...state,
            cart: action.payload.sort(( a, b ) => a.id - b.id )
        }
    }
    default:
        return {
            ...state
        }
    }
} 

export default cartReducer