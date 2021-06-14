import { combineReducers } from 'redux'
import homeReducer from './homeReducer/homeReducer'
import authenticationReducer from './authenticationReducer/authenticationReducer'

const reducer = combineReducers({ homeReducer, authenticationReducer })

export default reducer