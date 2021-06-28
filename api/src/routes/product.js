const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');
const { Op, col, fn } = require("sequelize");
const passport = require('passport');


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


router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { name, price, description = "", stock, score = 5, categories, images } = req.body;
  if (!name || !price || !stock) return response.success(req, res, { message: "Required fields are missing." });
  
  try {


      
      const product = await models.Product.create({
        name,
        price: Number(price),
        description,
        stock,
        score,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const productCategories = [];
      for (let category of categories) {
        let record = await models.Category.findOne({
          where: { name: category } // Assumes "categories" is an array of category names
        });
        productCategories.push(record);
      }
      await product.addCategories(productCategories);

      const productImages = [];
      for (let image of images) {
        let record = {
          url: image, // Assumes "images" is an array of URLs
          productId: product.id
        }
        productImages.push(record);
      }
      await models.Image.bulkCreate(productImages);

      response.success(req, res, product);

  } catch (error) {
    response.error(req, res, error.message);
  }
})

router.put('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  
  try {
    const { name, id, images, categories, stock, score, price, description } = req.body
		const product = await models.Product.findOne({
			where: { id: req.body.id },
			include: [
				{ model: models.Category, attributes: ['id', 'name'], through: { attributes: []} },
				{ model: models.Image, attributes: ['id', 'productId', 'url']} 
			]
		});

		if (!product) return response.success(req, res, { message: "Product not found." }, 404);

    // for (const property in req.body) {
    //   product[property] = req.body[property];
    // }
    product.name = name;
    product.stock = stock;
    product.score = score;
    product.price = price;
    product.description = description;

		await product.save();

		// Get categories
		const newCategories = [];
		for (let category of categories) {
			let record = await models.Category.findOne({
				where: { name: category }
			});
			newCategories.push(record);			
		}

		// Get images
		const newImages = [];
		for (let image of images) {
			let record = await models.Image.findOne({
				where: { url: image },
			})
      if(!record) {
        record = await models.Image.create({
          url: image,
          productId: id
        })
      }
			newImages.push(record);
		}
    await product.reload();
		// Add categories and images
		await product.setCategories(newCategories);
		await product.setImages(newImages);

		response.success(req, res, product);

	} catch (error) {
		response.error(req, res, error.message);
	}
})

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {

	try {
		const { id } = req.params;
		const product = await models.Product.findOne({ where: { id: parseInt(id) }});

		if (!product) return response.success(req, res, { message: "Product not found." }, 404);

		await product.destroy();
		response.success(req, res, { message: "Product deleted successfully." });
	} catch (error) {
		response.error(req, res, error);
	}
})


router.post('/stockbyid', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { idArray } = req.body 
  try {
    const productList = await models.Product.findAll({ 
      where: { id: idArray }, 
      attributes: ['stock', 'id', 'name'],
    })
    response.success(req, res, {productList}, 200)
  } catch (error) {
    response.error(req, res, error, 500);
  }
})



module.exports = router;