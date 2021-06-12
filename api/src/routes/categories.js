const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');

router.get('/', async (req, res) => {
  let categories = await models.Category.findAll()
  return response.success(req, res, categories, 200)
})

module.exports = router;

