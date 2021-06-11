const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
    
  //req will have sort, name, category, page, 
  let { name, category, filter = 'name', order = 'ASC', page = 1, limit = 8 } = req.query;

  if (name === '') name = null;
  if (category === '') category = null;
  if (filter === '') filter = 'name';
  if (order === '') order = 'ASC';

  async function getCategories(allProducts) {
    const productIds = allProducts.map(product => product.id);

    // Select all ProductCategories whose ProductId is in the ids array
    const allProductCategories = await models.ProductCategory.findAll({
      attributes: ['CategoryId'],
      where: { ProductId:  { [Op.in]: productIds } },
    })
    const categoryIds = allProductCategories.map(item => item.CategoryId)

    // Select all categories
    const allCategories = await models.Category.findAll({
      attributes: ['name'],
      where: { id: { [Op.in]: categoryIds } }
    })
    const categories = allCategories.map(category => category.name)

    return categories
  }

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

      // Get all product ids
      const allProducts = await models.Product.findAll({
        attributes: ['id'],
        where: { 
          name: { [Op.iLike]: `%${name}%` },
        }
      })

      const categories = await getCategories(allProducts)

      const products = await models.Product.findAll({
        where: { 
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [
          {
            model: models.Category,
            where: { name: { [Op.iLike]: `%${category}%` } },
            attributes: ['id', 'name'],
            through: { attributes: []}
          },
          {
            model: models.Image, attributes: ['id', 'url']
          }
        ],
        order: [[filter, order]],
        limit: limit,
        offset: (page * limit) - limit,
      });
      
      response.success(req, res, { ...data, count, pages, pageNumber, products, categories }, 200)

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

        // Get all product ids
        const allProducts = await models.Product.findAll({
          attributes: ['id'],
          include: [{
            model: models.Category,
            where: { name: { [Op.iLike]: `%${category}%` } }
          }],
        })

        const categories = await getCategories(allProducts)

        const products = await models.Product.findAll({
          include: [
            {
              model: models.Category,
              where: { name: { [Op.iLike]: `%${category}%` } },
              attributes: ['id', 'name'],
              through: { attributes: []}
            },
            {
              model: models.Image, attributes: ['id', 'url']
            }
          ],
          order: [[filter, order]],
          limit: limit,
          offset: (page * limit) - limit,
        });

          response.success(req, res, { ...data, count, pages, pageNumber, products, categories }, 200)

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

      // Get all product ids
      const allProducts = await models.Product.findAll({
        attributes: ['id'],
        where: { name: { [Op.iLike]: `%${name}%` } },
      })

      const categories = await getCategories(allProducts)

      const products = await models.Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [
          {
            model: models.Image,
            attributes: ['id', 'url']
          },
          {
            model: models.Category, 
            attributes: ['id', 'name'], 
            through: { attributes: []}
          }
        ],
        order: [[filter, order]],
        limit: limit,
        offset: (page * limit) - limit,
      });
      
      response.success(req, res, { ...data, count, pages, pageNumber, products, categories }, 200)

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

        // Get all product ids
        const allProducts = await models.Product.findAll({
          attributes: ['id'],
        })

        const categories = await getCategories(allProducts);

        // Get products with applied filters  
        const products = await models.Product.findAll({
          order: [[filter, order]],
          limit: limit,
          offset: (page * limit) - limit,
          include: [
            { model: models.Category, attributes: ['id', 'name'], through: { attributes: []} },
            { model: models.Image, attributes: ['id', 'url'] }
          ]
        });

        response.success(req, res, { ...data, count, pages, pageNumber, products, categories }, 200)
          
      } catch (error) {
        response.error(req, res, error, 500);
      }
  }

})

module.exports = router;