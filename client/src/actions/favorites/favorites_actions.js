import axios from 'axios';
import { ADD_TO_FAVORITES, GET_FAVORITES, DELETE_FAVORITE } from '../../actions_types/favorites/favorites_action_types';


export const addToFavorites = (product, userEmail) => {
    return (dispatch) => {
        return axios.post("http://localhost:3001/favorites", { params: { product: product, userEmail: userEmail } })
                .then(res => res.data)
                .then(res => {
                    dispatch({type: ADD_TO_FAVORITES,  payload: res.data});
                })
                .catch(e => console.log(e))
    }
}
export const getFavorites = (userEmail) => {
    return (dispatch) => {
        return axios.get("http://localhost:3001/favorites", { params: {userEmail: userEmail} })
                .then(res => res.data)
                .then(res => {
                    dispatch({type: GET_FAVORITES, payload: res.data});
                })
                .catch(e => console.log(e))
    }
}

export const deleteFavorite = (ProductId, userEmail) => {
    return (dispatch) => {
        return axios.delete("http://localhost:3001/favorites", { params: {id: ProductId, userEmail: userEmail} })
                .then(res => res.data)
                .then(res => {
                    dispatch({type: DELETE_FAVORITE, payload: res.data});
                })
                .catch(e => console.log(e))
    }
}

