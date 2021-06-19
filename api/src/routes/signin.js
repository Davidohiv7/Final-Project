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

    const { email, password} = req.body

    try {
        const userExistCheck = await models.User.findOne({ where: { email }})
        if(!userExistCheck || !userExistCheck.password) {
            return response.error(req, res, { message: 'The email or the password does not match' })
        }

        const match = await bcrypt.compare(password, userExistCheck.password);

        if(!match) {
            return response.error(req, res, { message: 'The email or the password does not match' })
        }

        const orderValidation = await models.Order.findOne({
            where: {
                status: 'created',
                userId: userExistCheck.id,
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
        response.error(req, res, error)
    }
    
})

module.exports = signInRouter