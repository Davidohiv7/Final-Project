import { combineReducers } from 'redux'
import homeReducer from './homeReducer/homeReducer'

const reducer = combineReducers({ homeReducer })

export default reducer