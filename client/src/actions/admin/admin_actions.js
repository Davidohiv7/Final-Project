import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY } from '../../actions_types/admin/admin_action_types'


export function getCategories() {
  return (dispatch) => {
      return axios.get("http://localhost:3001/categories")
              .then(res => res.data)
              .then(res => {
                  dispatch({type: GET_CATEGORIES, payload: res.data})
              })
              .catch(e => console.error(e))
  }
}

export function createCategory(name) {
  return (dispatch) => {
      return axios.post("http://localhost:3001/categories", {name: name})
                  .then(res => {
                      dispatch({type: CREATE_CATEGORY, payload: {name: name} })
                  })
                  .catch(e => console.error(e))
  }
}

