const { Router } = require('express');
const router = Router();
const product = require('./product')
const categories = require('./categories')

router.use('/products', product);
router.use('/categories', categories);

module.exports = router;