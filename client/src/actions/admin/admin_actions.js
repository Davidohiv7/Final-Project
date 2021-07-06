import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY, ADD_URL_TO_DELETE, GET_ORDERS, GET_USERS, GET_ALL_CATEGORIES } from '../../actions_types/admin/admin_action_types'

const apiURL = process.env.REACT_APP_API_URL
const jwt = localStorage.getItem('jwt')

export function getCategories(params) {
  return (dispatch) => {
      return axios.get(apiURL +  "/categories", {params: params}, { headers: { 'Authorization': jwt }})
              .then(res => res.data)
              .then(res => {
                  dispatch({type: GET_CATEGORIES, payload: res.data})
              })
              .catch(e => console.error(e))
  }
}

export function createCategory(name) {
  return (dispatch) => {
      return axios.post(apiURL +  "/categories", {name: name}, { headers: { 'Authorization': jwt }})
                  .then(res => {
                      dispatch({type: CREATE_CATEGORY, payload: {name: name} })
                  })
                  .catch(e => console.error(e))
  }
}

export function deleteCategory(name) {
  return (dispatch) => {
      return axios.delete(`${apiURL}/categories/${name}`, { headers: { 'Authorization': jwt }} )
                  .catch(e => console.error(e))
  }
}

export function deleteProductImage(file) {
  return (dispatch) => {
        axios.delete(`${apiURL}/image/cloudinary/${file.public_id}`, { headers: { 'Authorization': jwt }})
        .catch(e => console.error(e))
  }
}

export function createProduct(product) {
  return (dispatch) => {
      return axios.post(apiURL + "/products", {...product}, { headers: { 'Authorization': jwt }})
                  .catch(e => console.error(e))
  }
}

export function addUrlToDelete(url) {
  const id = url.split('/')[6]
  return (dispatch) => {
    dispatch({type:ADD_URL_TO_DELETE, payload: id})
  }
}

export function deleteImages(images) {
  return (dispatch) => {
      return axios.post(apiURL + "/images", {images: images}, { headers: { 'Authorization': jwt }})
                  .catch(e => console.error(e))
  }
}

export function updateProduct(product) {
  return (dispatch) => {
    return axios.put(apiURL + "/products", {...product}, { headers: { 'Authorization': jwt }})
                .catch(e => console.error(e))
  }
}

export function deleteProduct(id) {
  return (dispatch) => {
    return axios.delete(`${apiURL}/products/${id}`, { headers: { 'Authorization': jwt }})
                .catch(e => console.error(e))
  }
}

export function getOrders(params) {
  return (dispatch) => {
      axios.get(`${apiURL}/orders`, { params: params}, { headers: { 'Authorization': jwt }})
      .then(res => {
        dispatch({type: GET_ORDERS, payload: res.data})
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export function setStatus(order) {
  return (dispatch) => {
      axios.patch(`${apiURL}/orders`, order, { headers: { 'Authorization': jwt }})
      .catch(e => {console.error(e)})
  }
}

export function getUsers(params) {
  return (dispatch) => {
      axios.get(`${apiURL}/user`, { params: params}, { headers: { 'Authorization': jwt }})
      .then(res => {
        dispatch({type: GET_USERS, payload: res.data})
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(apiURL + "/user/delete_user", {data: {id: id}}, {
        headers: {
          'Authorization': jwt
        }
      }).then(res => {
        dispatch({
          type: GET_USERS,
          payload: res.data
        })
      })
      .catch(e => console.error(e))
  }
}

export function setRole(user) {
  return (dispatch) => {
      axios.patch(apiURL +  "/user", user, { headers: { 'Authorization': jwt }})
      .catch(e => {console.error(e)})
  }
}

export function getAllCategories(params) {
  return (dispatch) => {
      return axios.get(apiURL +  "/categories/all", {params: params}, { headers: { 'Authorization': jwt }})
              .then(res => res.data)
              .then(res => {
                  dispatch({type: GET_ALL_CATEGORIES, payload: res.data})
              })
              .catch(e => console.error(e))
  }
}
