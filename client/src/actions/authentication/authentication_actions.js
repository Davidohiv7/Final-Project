import axios from 'axios';
import { SIGN_UP, SIGN_IN } from '../../actions_types/authentication/authentication_actions_types'


export function signIn(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/signin", obj)
            if(response.data.data.token) {
                console.log(response.data.data.token)
                dispatch({type: SIGN_IN});
            }
        } catch (error) {
            console.log(error.response.data.data.message)
        }
    }
}

export function signUp(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/signup", obj)
            if(response.data.data.token) {
                console.log(response.data.data.token)
                dispatch({type: SIGN_UP});
            }
        } catch (error) {
            console.log(error.response.data.data.message)
        }
    }
}