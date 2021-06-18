const express = require('express')
const response = require('../utils/response')
const passport = require('passport')
const models = require('../database/models/');

const router = express.Router();


router.post('/add', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    const {product, quantity} = req.body

    try {
        const orderValidation = await models.Order.findOne({
            where: {
                status: 'created',
                userId: user.id,
            },
        }) 

        let cart = orderValidation

        if(!orderValidation) {
            cart = await models.Order.create({
                userId: user.id,
                status: "created",
                createdAt: new Date(),
                updatedAt: new Date(),
                total: 0, 
            })
        }

        const orderItemValidation = await models.OrderItem.findOne({
            where: {
                OrderId: cart.id,
                ProductId: product.id,
            },
        })

        
        let modifiedOrderItem = orderItemValidation

        if(modifiedOrderItem) {
            modifiedOrderItem.quantity = modifiedOrderItem.quantity + quantity
            modifiedOrderItem.subtotal = (Number(modifiedOrderItem.subtotal) + (Number(quantity) * product.price)).toFixed(2)
            await modifiedOrderItem.save()
        }

        if(!modifiedOrderItem) {
            modifiedOrderItem = await models.OrderItem.create({
                ProductId: product.id,
                OrderId: cart.id,
                quantity,
                subtotal: (Number(quantity) * Number(product.price)).toFixed(2),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        cart.total = (Number(cart.total) + (Number(quantity) * Number(product.price))).toFixed(2);
        await cart.save()

        const orderItems = await models.OrderItem.findAll({
            where: {
                OrderId: cart.id,
            }, 
        })

        
        

        const cartProductsIdArray = orderItems.map(p => p.ProductId)

        const cartData = await models.Product.findAll({ 
            where: {id: cartProductsIdArray},
            include: [{
                model: models.Order,
                where: { id: orderValidation.id  }
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

        response.success(req, res, {cart})
    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})

router.put('/modify', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    const {product, quantity} = req.body

    try {

        const cart = await models.Order.findOne({
            where: {
                status: 'created',
                userId: user.id,
            },
        }) 

        const orderItemModified = await models.OrderItem.findOne({
            where: {
                OrderId: cart.id,
                ProductId: product.id
            },
        }) 

        const previousSubtotal = Number(orderItemModified.subtotal)
        orderItemModified.quantity = quantity
        orderItemModified.subtotal = (Number(quantity) * Number(product.price)).toFixed(2)
        await orderItemModified.save()

        cart.total = (Number(cart.total) + Number(orderItemModified.subtotal) - previousSubtotal).toFixed(2);
        await cart.save()

        const orderItems = await models.OrderItem.findAll({
            where: {
                OrderId: cart.id,
            },
            order: [
                ['id', 'ASC'],
            ],
        })

        const cartProductsIdArray = orderItems.map(p => p.ProductId)
        const cartData = await models.Product.findAll({ 
            where: {id: cartProductsIdArray},
            include: [{
                model: models.Order,
                where: { id: cart.id  }
              },
              {
                model: models.Image,
            }],
        })


        newCart = cartData.map(p => {
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

        response.success(req, res, {cart: newCart})
    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})

router.put('/delete', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    const { product } = req.body

    try {

        const cart = await models.Order.findOne({
            where: {
                status: 'created',
                userId: user.id,
            },
        }) 

        cart.total = Number(cart.total) - (Number(product.price) * product.quantity)
        await cart.save()

        await models.OrderItem.destroy({
            where: {
                ProductId: product.id,
            }
        });

        const orderItems = await models.OrderItem.findAll({
            where: {
                OrderId: cart.id,
            },
            order: [
                ['id', 'ASC'],
            ],
        })

        const cartProductsIdArray = orderItems.map(p => p.ProductId)
        const cartData = await models.Product.findAll({ 
            where: {id: cartProductsIdArray},
            include: [{
                model: models.Order,
                where: { id: cart.id  }
              },
              {
                model: models.Image,
            }],
        })

        const newCart = cartData.map(p => {
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

        response.success(req, res, {cart: newCart})

    } catch (error) {
        response.error(req, res, error)
    }

})

router.delete('/clear', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user

    try {

        const cart = await models.Order.findOne({
            where: {
                status: 'created',
                userId: user.id,
            },
        }) 

        cart.total = 0
        await cart.save()

        const orderItems = await models.OrderItem.findAll({
            where: {
                OrderId: cart.id,
            }, 
        })

        const orderItemsIdArray = orderItems.map(p => p.ProductId)

        await models.OrderItem.destroy({
            where: {
                ProductId: orderItemsIdArray,
            }
        });

        const newOrderItems = await models.OrderItem.findAll({
            where: {
                OrderId: cart.id,
            }, 
        })

        response.success(req, res, {cart: newOrderItems})

    } catch (error) {
        response.error(req, res, error)
    }

})

module.exports = router