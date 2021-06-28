import { combineReducers } from 'redux';
import homeReducer from './homeReducer/homeReducer';
import authenticationReducer from './authenticationReducer/authenticationReducer';
import adminReducer from './adminReducer/adminReducer';
import checkoutReducer from './checkoutReducer/checkoutReducer';
import cartReducer from './cartReducer/cartReducer';
import  wishlistReducer from './wishlistReducer/wishlistReducer';

const reducer = combineReducers({ adminReducer, homeReducer, authenticationReducer, checkoutReducer, cartReducer, wishlistReducer});


export default reducer;