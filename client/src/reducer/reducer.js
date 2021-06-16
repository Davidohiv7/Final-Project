import { combineReducers } from 'redux'
import homeReducer from './homeReducer/homeReducer'
import authenticationReducer from './authenticationReducer/authenticationReducer'
import adminReducer from './adminReducer/adminReducer'
import checkoutReducer from './checkoutReducer/checkoutReducer'

const reducer = combineReducers({ adminReducer, homeReducer, authenticationReducer, checkoutReducer})


export default reducer