const { Router } = require('express');
const router = Router();

const product = require('./product')
const signup = require('./signup')
const signin = require('./signin')
const googleauth = require('./googleauth')
const user = require('./user')
//const test = require('./test')
const categories = require('./categories')
const images = require("./image");
const mercadopago = require('./mercadopago');
const orders = require('./orders');
const cart = require('./cart');
const checkout = require('./checkout');
const mercadopagoConfirmation = require('./mercadopagoConfirmation');
const reviews = require('./reviews');
const shippingaddress = require('./shippingaddress');

router.use('/confirm/mercadopago', mercadopagoConfirmation);
router.use('/create_preference', mercadopago);
router.use('/categories', categories);
router.use('/products', product);
router.use('/signup', signup);
router.use('/signin', signin);
router.use('/googleauth', googleauth);
router.use('/user', user);
router.use('/image', images);
router.use('/orders', orders);
router.use('/cart', cart);
router.use('/checkout', checkout);
//router.use('/test', test);
router.use('/reviews', reviews);
router.use('/shippingaddress', shippingaddress);


module.exports = router;