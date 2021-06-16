const { Router } = require('express');
const router = Router();
const product = require('./product')
const signup = require('./signup')
const signin = require('./signin')
const googleauth = require('./googleauth')
const user = require('./user')
const test = require('./test')
const categories = require('./categories')
const images = require("./image");


router.use('/categories', categories);
router.use('/products', product);
router.use('/signup', signup);
router.use('/signin', signin);
router.use('/googleauth', googleauth);
router.use('/user', user);
router.use('/test', test);
router.use('/image', images);

module.exports = router;