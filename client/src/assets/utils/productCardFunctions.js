export function createArrayFromNumber(number) {
    const arrayOfNumbers = []
        for (let i = 1; i <= number; i++) {
            arrayOfNumbers.push(i);
        }
    return arrayOfNumbers     
}

export function addToCart(product, quantity, setQuantity) {
    const cartString = localStorage.getItem('cart')
    let newCart
    if(!cartString) {
        newCart = [{id: product.id, name: product.name, quantity }]
    }
    if(cartString) {
        newCart = JSON.parse(cartString)
        const currentProductIndex = newCart.findIndex(p => p.id === product.id)
        if(currentProductIndex !== -1) {
            console.log(quantity)
            newCart[currentProductIndex].quantity = newCart[currentProductIndex].quantity + quantity
        }
        if(currentProductIndex === -1) {
            newCart.push({id: product.id, name: product.name, quantity })
        }
    }
    const cartData = JSON.stringify(newCart)
    localStorage.setItem('cart', cartData)
    setQuantity(1)
}

export function addToFavorites(product) {
    const favouriteString = localStorage.getItem('favourites')
    let newFavourites
    if(!favouriteString) {
        newFavourites = [product.id]
    }
    if(favouriteString) {
        newFavourites = JSON.parse(favouriteString)
        if(!newFavourites.includes(product.id)) {
            newFavourites.push(product.id)
        }
    }
    const favouritesData = JSON.stringify(newFavourites)
    localStorage.setItem('favourites', favouritesData)
}