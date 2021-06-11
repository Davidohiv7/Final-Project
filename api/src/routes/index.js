const { Router } = require('express');
const router = Router();
const product = require('./product')
const signup = require('./signup')
const signin = require('./signin')
const googleauth = require('./googleauth')
const test = require('./test')

router.use('/products', product);
router.use('/signup', signup);
router.use('/signin', signin);
router.use('/googleauth', googleauth);
router.use('/test', test);

module.exports = router;