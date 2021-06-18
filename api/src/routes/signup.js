const express = require('express')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')
const signUpRouter = express.Router();
const bcrypt = require('bcrypt')

const { SECRET_KEY_JWT, SALT_ROUNDS } = process.env


const models = require('../database/models/');

signUpRouter.get('/', (req, res, next) => {
    res.send('Esta es la ruta de sign up')
})
  
signUpRouter.post('/', async (req, res, next) => {
    const newUserData = req.body
    const saltRounds = Number(SALT_ROUNDS)
    try {
        const checkedUser = await models.User.findOne({where: {
            email: newUserData.email
            }
        })
        if(checkedUser) {
            return response.error(req, res, {message: 'This email is already taken'})
        }

        const hashedPassword = bcrypt.hashSync(newUserData.password, saltRounds);

        const newUser = await models.User.create({
            ...newUserData,
            password: hashedPassword,
            role: "customer",
            createdAt: new Date(),
            updatedAt: new Date() 
        })

        const firstUserOrder = await models.Order.create({
            userId: newUser.id,
            status: "created",
            createdAt: new Date(),
            updatedAt: new Date(),
            total: 0, 
        })

        let newCart = false

        if(newUserData.cart.length > 0) {
            const cartProductsIdArray = newUserData.cart.map(p => p.id)
            const orderItemsArrayData = newUserData.cart.map(p => {
                return {
                    ProductId: p.id,
                    OrderId: firstUserOrder.id,
                    quantity: p.quantity,
                    subtotal: ((p.quantity * p.price).toFixed(2)),
                    createdAt: new Date(),
                    updatedAt: new Date() 
                }
            })
            await models.OrderItem.bulkCreate(orderItemsArrayData);
            const newCartData = await models.Product.findAll({ 
                where: {id: cartProductsIdArray},
                include: [{
                    model: models.Order,
                    where: { id: firstUserOrder.id }
                  },
                  {
                    model: models.Image,
                  }],
              })
            newCart = newCartData.map(p => {
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
            const newTotal = newCart.map(p => p.price * p.quantity).reduce((acc, v) => acc + v)
            firstUserOrder.total = newTotal
            await firstUserOrder.save()
        }

        const jasonWebToken = jwt.sign({id: newUser.id, email: newUser.email}, SECRET_KEY_JWT)

        response.success(req, res, {message: `User was successfully created`, token: jasonWebToken, cart: newCart})

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})


module.exports = signUpRouter