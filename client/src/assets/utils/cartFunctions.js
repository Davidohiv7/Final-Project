export function readLocalStorageCart() {
    return JSON.parse(localStorage.getItem('cart'))
}

export function modifyQuantity(product, value) {
    const newCart = JSON.parse(localStorage.getItem('cart'))
    const currentProductIndex = newCart.findIndex(p => p.id === product.id)
    newCart[currentProductIndex].quantity = value
    const cartData = JSON.stringify(newCart)
    localStorage.setItem('cart', cartData)
}

export function deleteProductFromCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const filteredCart = cart.filter(p => p.id !== product.id)
    const cartData = JSON.stringify(filteredCart)
    localStorage.setItem('cart', cartData)
}