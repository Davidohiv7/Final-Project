const express = require('express')
const response = require('../utils/response')
const passport = require('passport')
const models = require('../database/models/');
const { Op } = require("sequelize");

const router = express.Router();


router.get('/data', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const userData = {
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role
    }

    try {
        let orderValidation = await models.Cart.findOne({
            where: {
                status: ['created', 'paid'],
                personId: req.user.id,
            },
        })
    
      
        let orderItems = false
      
        if(orderValidation) {
            orderItems = await models.CartItem.findAll({
                where: {
                    CartId: orderValidation.id,
                }, 
            })
        }
    
      
        let cart = false 
      
        if(orderItems) {
            const cartProductsIdArray = orderItems.map(p => p.ProductId)
            const cartData = await models.Product.findAll({ 
                where: {id: cartProductsIdArray},
                include: [{
                    model: models.Cart,
                    where: { 
                        id: orderValidation.id 
                        }
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
                    quantity: p.Carts[0].CartItem.quantity,
            }
          })
        }
    
    
        userOrders = await models.Cart.findAll({
            where: {
                personId: req.user.id,
                status: { [Op.not]: ['created', 'paid']},
            },
            attributes:  { exclude: ['createdAt'] },
        })
    
        const orders = userOrders ? userOrders : []
        
        const total = orderValidation ? orderValidation.total : 0.00
    
        const shippingAddress = orderValidation ? {
            city: orderValidation.city,
            zip: orderValidation.zip,
            neighborhood: orderValidation.neighborhood,
            street: orderValidation.street
        } 
        : null
    
        const paymentStatus = orderValidation ? {
            status: orderValidation.status,
            paymentMethod: orderValidation.paymentMethod
        }
        :
        null
        
        response.success(req, res, {userData, cart, total, shippingAddress, paymentStatus, orders }) 
    } catch (error) {
        console.log(error)
        response.error(req, res, {message: 'We couldn`t get user information'}) 
    }
    
})
  

module.exports = router