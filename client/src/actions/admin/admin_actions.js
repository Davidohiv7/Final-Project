import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY, CREATE_PRODUCT } from '../../actions_types/admin/admin_action_types'


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

export function deleteProductImage(file) {
  return (dispatch) => {
        axios.delete(`http://localhost:3001/image/cloudinary/${file.public_id}`)
        .catch(e => console.error(e))
  }
}

export function createProduct(product) {
  return (dispatch) => {
      return axios.post("http://localhost:3001/products", {...product})
                  .catch(e => console.error(e))
  }
}
