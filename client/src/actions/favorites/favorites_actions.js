import axios from 'axios';
import { ADD_TO_FAVORITES, GET_FAVORITES, DELETE_FAVORITE } from '../../actions_types/favorites/favorites_action_types';

const apiURL = process.env.REACT_APP_API_URL

export const addToFavorites = (product, userEmail) => {
    return (dispatch) => {
        return axios.post(apiURL + "/favorites", { params: { product: product, userEmail: userEmail } })
                .then(res => res.data)
                .then(res => {
                    dispatch({type: ADD_TO_FAVORITES,  payload: res.data});
                })
                .catch(e => console.log(e))
    }
}
export const getFavorites = (userEmail) => {
    return (dispatch) => {
        return axios.get(apiURL + "/favorites", { params: {userEmail: userEmail} })
                .then(res => res.data)
                .then(res => {
                    dispatch({type: GET_FAVORITES, payload: res.data});
                })
                .catch(e => console.log(e))
    }
}

export const deleteFavorite = (ProductId, userEmail) => {
    return (dispatch) => {
        return axios.delete(apiURL + "/favorites", { params: {id: ProductId, userEmail: userEmail} })
                .then(res => res.data)
                .then(res => {
                    dispatch({type: DELETE_FAVORITE, payload: res.data});
                    dispatch(getFavorites(userEmail));
                })
                .catch(e => console.log(e))
    }
}

