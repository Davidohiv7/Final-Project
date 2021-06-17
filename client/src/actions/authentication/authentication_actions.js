import axios from 'axios';
import { SIGN_UP, SIGN_IN, LOG_OUT, AUTH_ERROR, GET_USER_DATA } from '../../actions_types/authentication/authentication_actions_types'


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

export function getUserData(jwt) {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/user/data", { headers: { 'Authorization': jwt } })
            const userData = response.data.data
            dispatch({type: GET_USER_DATA, payload: userData});
        } catch (error) {
            console.log(error)
        }
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT,
    }
}

export function emailconfirm(obj) {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/sendmail", obj)
            console.log(response)
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.data.message
            });
            setTimeout(() => dispatch({
                type: AUTH_ERROR,
                payload: ''
            }), 5000)
        }
    }
}