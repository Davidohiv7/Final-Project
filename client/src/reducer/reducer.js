import { combineReducers } from 'redux'
import homeReducer from './homeReducer/homeReducer'
import authenticationReducer from './authenticationReducer/authenticationReducer'
import adminReducer from './adminReducer/adminReducer'

const reducer = combineReducers({ adminReducer, homeReducer, authenticationReducer,  })


export default reducer