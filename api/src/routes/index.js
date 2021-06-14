const { Router } = require('express');
const router = Router();
const product = require('./product')
<<<<<<< HEAD
const categories = require('./categories')

router.use('/products', product);
router.use('/categories', categories);
=======
const signup = require('./signup')
const signin = require('./signin')
const googleauth = require('./googleauth')
const test = require('./test')

router.use('/products', product);
router.use('/signup', signup);
router.use('/signin', signin);
router.use('/googleauth', googleauth);
router.use('/test', test);
>>>>>>> f9756a75e636b14fdc1b01769386c1a3b06a0f7c

module.exports = router;