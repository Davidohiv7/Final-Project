const { Router } = require('express');
const router = Router();
const Product = require('../database/models/product');
const response = require('../utils/response');


router.get('/products', async (req, res) => {
    
    //req will have sort, name, category, page, 
    let { name, category, filter = 'name', order = 'ASC', page = 1 } = req.query;

    // If the user searches a name in a category
    if (category && name) {

      try {
        const { count } = await Product.findAndCountAll({
          where: { 
              name: { [Op.iLike]: '%' + name + '%' },
              category: category
          },
        });
  
        const products = await Product.findAll({
          where: { 
              name: { [Op.iLike]: '%' + name + '%' },
              category: category
          },
          order: [[filter, order]],
          limit: 8,
          offset: page * 8 - 8,
        });
        
        response.success(req, res, { products, count }, 200)
        //res.status(200).json({ products: products, count: count })

      } catch (error) {
        response.error(req, res, error, 500);
      }


    // If the user selects a new category
    } else if (category && !name) {
        try {
            const { count } = await Product.findAndCountAll({
                where: { 
                    category: category
                },
            });

            const products = await Product.findAll({
                where: { category: category },
                order: [[filter, order]],
                limit: 8,
                offset: page * 8 - 8,
            });

            response.success(req, res, { products, count }, 200)

        } catch (error) {
            response.error(req, res, error, 500);
        }

    // If the user searches a name without a preselected category 3
    } else if (!category && name) {

      try {
        const { count } = await Product.findAndCountAll({
          where: { 
              name: { [Op.iLike]: '%' + name + '%' },
          },
        });

        const products = await Product.findAll({
          where: { name: { [Op.iLike]: '%' + name + '%' } },
            order: [[filter, order]],
            limit: 8,
            offset: page * 8 - 8,
        });
        
        response.success(req, res, { products, count }, 200)

      } catch (error) {
        response.error(req, res, error, 500);
      }
      
    // When the page loads without filters/sorts
    } else if (!category && !name) {
        try {
            const { count } = await Product.findAndCountAll({
            });
            
            const products = await Product.findAll({
                order: [[filter, order]],
                limit: 8,
                offset: page * 8 - 8,
            });

            response.success(req, res, { products, count }, 200)
            
        } catch (error) {
            response.error(req, res, error, 500);
        }
    }

})

module.exports = router;