export function clearCheckoutData() {
    localStorage.removeItem('cart')
    localStorage.removeItem('checkout')
    localStorage.removeItem('customerInformation')
}