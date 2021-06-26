import axios from 'axios';
import { ADD_TO_FAVORITES, GET_FAVORITES } from '../../actions_types/favorites/favorites_action_types';


export const addToFavorites = (product, userEmail) => {
    return (dispatch) => {
        return axios.post("http://localhost:3001/add_favorite", { params: { product: product, userEmail: userEmail } })
                .then(res => res.data)
                .then(res => {
                    dispatch({type: ADD_TO_FAVORITES});
                })
                .catch(e => console.log(e))
    }
}
export const getFavorites = (userEmail) => {
    return (dispatch) => {
        return axios.get("http://localhost:3001/add_favorite", { params: {userEmail: userEmail} })
                .then(res => res.data)
                .then(res => {
                    dispatch({type: GET_FAVORITES, payload: res.data});
                })
                .catch(e => console.log(e))
    }
}