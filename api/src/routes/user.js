const express = require('express')
const response = require('../utils/response')
const passport = require('passport')
const models = require('../database/models/');

const router = express.Router();


router.get('/data', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const userData = {
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role
    }

    const orderValidation = await models.Order.findOne({
        where: {
            status: 'created',
            userId: req.user.id,
        },
    })
  
    let orderItems = false
  
    if(orderValidation) {
        orderItems = await models.OrderItem.findAll({
            where: {
                OrderId: orderValidation.id,
            }, 
        })
    }
  
    let cart = false 
  
    if(orderItems) {
      const cartProductsIdArray = orderItems.map(p => p.ProductId)
      const cartData = await models.Product.findAll({ 
          where: {id: cartProductsIdArray},
          include: [{
              model: models.Order,
              where: { id: req.user.id }
            },
            {
              model: models.Image,
            }],
        })
      cart = cartData.map(p => {
          return {
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.price,
              stock: p.stock,
              Images: p.Images,
              quantity: p.Orders[0].OrderItem.quantity,
          }
      })
    }

    const total = orderValidation ? orderValidation.total : 0.00
    
    response.success(req, res, {userData, cart, total })
})
  

module.exports = router