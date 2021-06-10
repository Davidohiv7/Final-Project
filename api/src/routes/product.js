const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
    
  //req will have sort, name, category, page, 
  let { name, category, filter = 'name', order = 'ASC', page = 1, limit = 8 } = req.query;

  // If the user searches a name in a category
  if (category && name) {

    try {
      const { count } = await models.Product.findAndCountAll({
        where: {
          name: { [Op.iLike]: `%${name}%` }, 
        },
        include: [{
          model: models.Category,
          where: { name: { [Op.iLike]: `%${category}%` } }
        }]
      });

      if (count === 0) return response.success(req, res, "No results found!", 404);

      const data = {};
      let pages = Math.ceil(count / limit)
      if (page > pages) page = pages;
      const pageNumber = parseInt(page)
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      if (endIndex < count) data.nextPage = pageNumber + 1;
      if (startIndex > 0) data.previousPage = pageNumber - 1;

      const products = await models.Product.findAll({
        where: { 
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [{
          model: models.Category,
          where: { name: { [Op.iLike]: `%${category}%` } }
        }],
        order: [[filter, order]],
        limit: limit,
        offset: (page * limit) - limit,
      });
      
      response.success(req, res, { ...data, count, pages, pageNumber, products }, 200)

    } catch (error) {
      response.error(req, res, error, 500);
    }

    // If the user selects a new category
  } else if (category && !name) {
      try {
        const { count } = await models.Product.findAndCountAll({
          include: [{
            model: models.Category,
            where: { name: { [Op.iLike]: `%${category}%` } }
          }],
        });

        if (count === 0) return response.success(req, res, "No results found!", 404);

        const data = {};
        let pages = Math.ceil(count / limit)
        if (page > pages) page = pages;
        const pageNumber = parseInt(page)
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        if (endIndex < count) data.nextPage = pageNumber + 1;
        if (startIndex > 0) data.previousPage = pageNumber - 1;

        const products = await models.Product.findAll({
          include: [{
            model: models.Category,
            where: { name: { [Op.iLike]: `%${category}%` } }
          }],
          order: [[filter, order]],
          limit: limit,
          offset: (page * limit) - limit,
        });

          response.success(req, res, { ...data, count, pages, pageNumber, products }, 200)

      } catch (error) {
        response.error(req, res, error, 500);
      }

    // If the user searches a name without a preselected category 3
  } else if (!category && name) {

    try {
      const { count } = await models.Product.findAndCountAll({
        where: { 
          name: { [Op.iLike]: `%${name}%` },
        },
      });

      const data = {};
      if (count === 0) return response.success(req, res, "No results found!", 404);
      let pages = Math.ceil(count / limit)
      if (page > pages) page = pages;
      const pageNumber = parseInt(page)
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      if (endIndex < count) data.nextPage = pageNumber + 1;
      if (startIndex > 0) data.previousPage = pageNumber - 1;

      const products = await models.Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        order: [[filter, order]],
        limit: limit,
        offset: (page * limit) - limit,
      });
      
      response.success(req, res, { ...data, count, pages, pageNumber, products }, 200)

    } catch (error) {
      response.error(req, res, error, 500);
    }
      
    // When the page loads without filters/sorts
  } else if (!category && !name) {
      try {
        const { count } = await models.Product.findAndCountAll();

        if (count === 0) return response.success(req, res, "No results found!", 404);

        const data = {};
        let pages = Math.ceil(count / limit)
        if (page > pages) page = pages;
        const pageNumber = parseInt(page)
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        if (endIndex < count) data.nextPage = pageNumber + 1;
        if (startIndex > 0) data.previousPage = pageNumber - 1;
          
        const products = await models.Product.findAll({
          order: [[filter, order]],
          limit: limit,
          offset: (page * limit) - limit,
          include: [{
            model: models.Category,
          }]
        });

        response.success(req, res, { ...data, count, pages, pageNumber, products }, 200)
          
      } catch (error) {
        response.error(req, res, error, 500);
      }
  }

})

module.exports = router;