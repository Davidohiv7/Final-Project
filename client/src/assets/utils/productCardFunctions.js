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
        newCart = [{...product, quantity}]
    }
    if(cartString) {
        newCart = JSON.parse(cartString)
        const currentProductIndex = newCart.findIndex(p => p.id === product.id)
        if(currentProductIndex !== -1) {
            newCart[currentProductIndex].quantity = newCart[currentProductIndex].quantity + quantity
        }
        if(currentProductIndex === -1) {
            newCart.push({...product, quantity})
        }
    }
    const cartData = JSON.stringify(newCart)
    localStorage.setItem('cart', cartData)
    setQuantity(1)
}

