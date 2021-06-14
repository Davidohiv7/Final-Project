import axios from 'axios';
import { SIGN_UP, SIGN_IN, AUTH_ERROR } from '../../actions_types/authentication/authentication_actions_types'


export function signIn(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/signin", obj)
            if(response.data.data.token) {
                dispatch({type: SIGN_IN});
                localStorage.setItem('jwt', `Bearer ${response.data.data.token}`)
            }
        } catch (error) {
            dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
            setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 5000)
        }
    }
}

export function signUp(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/signup", obj)
            console.log(response)
            if(response.data.data.token) {
                dispatch({type: SIGN_UP});
                localStorage.setItem('jwt', `Bearer ${response.data.data.token}`)
            }
        } catch (error) {
            dispatch({type: AUTH_ERROR, payload: error.response.data.data.message});
            setTimeout(() => dispatch({type: AUTH_ERROR, payload: ''}), 5000)
        }
    }
}