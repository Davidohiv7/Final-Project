const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
  try {
      let { name, page = 1, limit = 8 } = req.query;

      if (name === "") name = null;

      if (!name) {
          const { count } = await models.Category.findAndCountAll();

          if (count === 0) return response.success(req, res,  {categories: []}, 200);
  
          const data = {};
          let pages = Math.ceil(count / limit);
          if (page > pages) page = pages;
          const pageNumber = parseInt(page)
          let startIndex = (page - 1) * limit;
          let endIndex = page * limit;
          if (endIndex < count) data.nextPage = pageNumber + 1;
          if (startIndex > 0) data.previousPage = pageNumber - 1;

          const categories = await models.Category.findAll({
              limit: limit,
              offset: (page * limit) - limit,
              order: [['name', 'ASC']]
          });

          return response.success(req, res, { ...data, count, pages, pageNumber, categories }, 200);
      }

      const { count } = await models.Category.findAndCountAll({
        where: {name: { [Op.iLike]: `%${name}%` }}
      });
  
      if (count === 0) return response.success(req, res, {categories: []}, 200);
  
      const data = {};
      let pages = Math.ceil(count / limit);
      if (page > pages) page = pages;
      const pageNumber = parseInt(page)
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      if (endIndex < count) data.nextPage = pageNumber + 1;
      if (startIndex > 0) data.previousPage = pageNumber - 1;

      const categories = await models.Category.findAll({
          where: {name: { [Op.iLike]: `%${name}%` }},
          limit: limit,
          offset: (page * limit) - limit,
          order: [['name', 'ASC']]
      });

      response.success(req, res, { ...data, count, pages, pageNumber, categories }, 200);

  } catch (error) {
      response.error(req, res, {categories: []}, 500);
  }

})

router.post('/', async (req, res) => {
  models.Category.create({name:req.body.name})
  return response.success(req, res, null, 200)
})

router.delete('/:name', async (req, res) => {
  try {
    const { name } = req.params;
		const category = await models.Category.findOne({ where: { name: name }});

		if (!category) return response.success(req, res, { message: "Category not found." }, 200);

		await category.destroy();
		response.success(req, res, { message: "Category deleted successfully." });
	} catch (error) {
		response.error(req, res, error);
	}
})


router.get('/all', (req, res) => {
  models.Category.findAll()
  .then(resp => response.success(req, res, resp, 200))
})
module.exports = router;

