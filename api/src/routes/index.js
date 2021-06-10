const { Router } = require('express');
const router = Router();
const product = require('./product')

router.use('/products', product);

module.exports = router;