import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY, ADD_URL_TO_DELETE, GET_ORDERS } from '../../actions_types/admin/admin_action_types'


export function getCategories(params) {
  return (dispatch) => {
      return axios.get("http://localhost:3001/categories", {params: params})
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

export function addUrlToDelete(url) {
  const id = url.split('/')[6]
  return (dispatch) => {
    dispatch({type:ADD_URL_TO_DELETE, payload: id})
  }
}

export function deleteImages(images) {
  return (dispatch) => {
      return axios.post("http://localhost:3001/images", {images: images})
                  .catch(e => console.error(e))
  }
}

export function updateProduct(product) {
  return (dispatch) => {
    return axios.put("http://localhost:3001/products", {...product})
                .catch(e => console.error(e))
  }
}

export function deleteProduct(id) {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/products/${id}`)
                .catch(e => console.error(e))
  }
}

export function getOrders(params) {
  return (dispatch) => {
      axios.get(`http://localhost:3001/orders`, { params: params})
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
      axios.patch(`http://localhost:3001/orders`, order)
      .catch(e => {console.error(e)})
  }
}
