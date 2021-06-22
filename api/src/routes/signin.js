const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')

const signInRouter = express.Router();

const { SECRET_KEY_JWT } = process.env


const models = require('../database/models/');

signInRouter.get('/', (req, res, next) => {
    res.send('Esta es la ruta de sign in')
})
  
signInRouter.post('/', async (req, res, next) => {

    const { email, password, localCart} = req.body

    try {
        const userExistCheck = await models.User.findOne({ where: { email }})
        if(!userExistCheck || !userExistCheck.password) {
            return response.error(req, res, { message: 'The email or the password does not match' })
        }

        const match = await bcrypt.compare(password, userExistCheck.password);

        if(!match) {
            return response.error(req, res, { message: 'The email or the password does not match' })
        }

        let orderValidation = await models.Order.findOne({
            where: {
                status: 'created',
                userId: userExistCheck.id,
            },
        })

        let cartProductsIdArray = []
        let orderItems = false

        if(orderValidation) {
            orderItems = await models.OrderItem.findAll({
                where: {
                    OrderId: orderValidation.id,
                }, 
            })
        }

        if(!orderValidation) {
            orderValidation = await models.Order.create({
                userId: userExistCheck.id,
                status: "created",
                createdAt: new Date(),
                updatedAt: new Date(),
                total: 0, 
            })
        }

        if(orderItems) {
            cartProductsIdArray = orderItems.map(p => p.ProductId)
        }

        if(orderItems.length > 0 && localCart?.length > 0) {
            const existingProductsId = []
            const modifiedOrderItems = []
         
            orderItems.forEach((orderItem) => {
                const validateProduct = localCart.find(p => p.id === orderItem.ProductId)
                if(validateProduct) {
                    existingProductsId.push(orderItem.ProductId)
                    orderItem.quantity = (orderItem.quantity + validateProduct.quantity) > validateProduct.stock ? Number(validateProduct.stock) : orderItem.quantity + validateProduct.quantity
                    orderItem.subtotal = orderItem.quantity * Number(validateProduct.price)
                    modifiedOrderItems.push(orderItem)
                }
            })

            modifiedOrderItemsPromiseArray = modifiedOrderItems.map(moi => moi.save())

            await Promise.all(modifiedOrderItemsPromiseArray)

            const newProductsInCart = []
            localCart.forEach(p => {
                if(!existingProductsId.includes(p.id)) {
                    newProductsInCart.push({
                        ProductId: p.id,
                        OrderId: orderValidation.id,
                        quantity: p.quantity,
                        subtotal: ((p.quantity * p.price).toFixed(2)),
                        createdAt: new Date(),
                        updatedAt: new Date() 
                    })
                }
            })
            if(newProductsInCart.length > 0) {
                await models.OrderItem.bulkCreate(newProductsInCart);
            }
            orderItems = await models.OrderItem.findAll({
                where: {
                    OrderId: orderValidation.id,
                }, 
            })
        }

        if(orderItems.length === 0 && localCart?.length > 0) {
            cartProductsIdArray = localCart.map(p => p.id)
            const orderItemsArrayData = localCart.map(p => {
                return {
                    ProductId: p.id,
                    OrderId: orderValidation.id,
                    quantity: p.quantity,
                    subtotal: ((p.quantity * p.price).toFixed(2)),
                    createdAt: new Date(),
                    updatedAt: new Date() 
                }
            })
            orderItems = await models.OrderItem.bulkCreate(orderItemsArrayData);
        }

        let cart = false

        if(orderItems) {
            orderValidation.total = orderItems.reduce((acc, oi) => acc + Number(oi.subtotal), 0)
            await orderValidation.save()
            const cartData = await models.Product.findAll({ 
                where: {id: cartProductsIdArray},
                include: [{
                    model: models.Order,
                    where: { id: userExistCheck.id }
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

        const jasonWebToken = jwt.sign({id: userExistCheck.id, username: userExistCheck.username}, SECRET_KEY_JWT)


        return response.success(req, res, {message: 'Successful log in', token: jasonWebToken, cart})

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
    
})

module.exports = signInRouter