const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')
const {transporter, authMailing } = require('../mailingMid/NodemailerGoogleMid')
const { twoFAEmailMail } = require('../utils/mailtemplates');
const speakeasy = require("speakeasy");

const signInRouter = express.Router();

const { SECRET_KEY_JWT, GOOGLE_MAIL } = process.env


const models = require('../database/models/');

signInRouter.get('/', (req, res, next) => {
    res.send('Esta es la ruta de sign in')
})
  
signInRouter.post('/', async (req, res, next) => {

    const { email, password, localCart} = req.body

    try {
        const userExistCheck = await models.Person.findOne({ where: { email }})
        if(!userExistCheck || !userExistCheck.password) {
            return response.error(req, res, { message: 'The email or the password does not match' })
        }

        const match = await bcrypt.compare(password, userExistCheck.password);

        if(!match) {
            return response.error(req, res, { message: 'The email or the password does not match' })
        }

        let orderValidation = await models.Cart.findOne({
            where: {
                status: 'created',
                personId: userExistCheck.id,
            },
        })

        let cartProductsIdArray = []
        let orderItems = false

        if(orderValidation) {
            orderItems = await models.CartItem.findAll({
                where: {
                    CartId: orderValidation.id,
                }, 
            })
        }

        if(!orderValidation) {
            orderValidation = await models.Cart.create({
                personId: userExistCheck.id,
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
                        CartId: orderValidation.id,
                        quantity: p.quantity,
                        subtotal: ((p.quantity * p.price).toFixed(2)),
                        createdAt: new Date(),
                        updatedAt: new Date() 
                    })
                }
            })
            if(newProductsInCart.length > 0) {
                await models.CartItem.bulkCreate(newProductsInCart);
            }
            orderItems = await models.CartItem.findAll({
                where: {
                    CartId: orderValidation.id,
                }, 
            })
        }

        if(!orderItems) {
            orderItems = []
        }

        if(orderItems.length === 0 && localCart?.length > 0) {
            cartProductsIdArray = localCart.map(p => p.id)
            const orderItemsArrayData = localCart.map(p => {
                return {
                    ProductId: p.id,
                    CartId: orderValidation.id,
                    quantity: p.quantity,
                    subtotal: ((p.quantity * p.price).toFixed(2)),
                    createdAt: new Date(),
                    updatedAt: new Date() 
                }
            })
            orderItems = await models.CartItem.bulkCreate(orderItemsArrayData);
        }

        let cart = false

        if(orderItems) {
            orderValidation.total = orderItems.reduce((acc, oi) => acc + Number(oi.subtotal), 0)
            await orderValidation.save()
            const cartData = await models.Product.findAll({ 
                where: {id: cartProductsIdArray},
                include: [{
                    model: models.Cart,
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
                    quantity: p.Carts[0].CartItem.quantity,
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

signInRouter.post('/twofa/email', async (req, res, next) => {

    const { email, password } = req.body

    try {
        const userExistCheck = await models.Person.findOne({ where: { email }})
        if(!userExistCheck || !userExistCheck.password) {
            return response.error(req, res, { message: 'The email or the password does not match' })
        }

        const match = await bcrypt.compare(password, userExistCheck.password);

        if(!match) {
            return response.error(req, res, { message: 'The email or the password does not match' })
        }

        //Generate token
        const newSecret = speakeasy.generateSecret();

        const newToken = speakeasy.totp({
            secret: newSecret.base32,
            encoding: 'base32'
          });

        //Save secret
        userExistCheck.twofapassword = newSecret.base32
        await userExistCheck.save()

        //Send token to user mail
        transporter.sendMail({
            from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
            to: email,
            subject: 'Your sign in code for Onion is..',
            html: twoFAEmailMail(userExistCheck.name, newToken),
            auth: authMailing,
        });
       


        return response.success(req, res, {twofa: true})

    } catch (error) {
        console.log(error)
        response.error(req, res, { message: 'We couldn`t conenct to the server' })
    }
    
})

signInRouter.post('/twofa/email/confirm', async (req, res, next) => {

    const { code, email, localCart } = req.body

    try {
        const user2FA = await models.Person.findOne({ where: { email }})

        if(!user2FA) {
            return response.error(req, res, { message: 'There was an internal problem' })
        }

        const match = speakeasy.totp.verify({
            secret: user2FA.twofapassword,
            encoding: 'base32',
            token: code,
            window: 6
        });

        if(!match) {
            return response.error(req, res, { message: 'The code doesn`t match' })
        }

        user2FA.twofapassword = null
        await user2FA.save()

        let orderValidation = await models.Cart.findOne({
            where: {
                status: 'created',
                personId: user2FA.id,
            },
        })

        let cartProductsIdArray = []
        let orderItems = false

        if(orderValidation) {
            orderItems = await models.CartItem.findAll({
                where: {
                    CartId: orderValidation.id,
                }, 
            })
        }

        if(!orderValidation) {
            orderValidation = await models.Cart.create({
                personId: user2FA.id,
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
                        CartId: orderValidation.id,
                        quantity: p.quantity,
                        subtotal: ((p.quantity * p.price).toFixed(2)),
                        createdAt: new Date(),
                        updatedAt: new Date() 
                    })
                }
            })
            if(newProductsInCart.length > 0) {
                await models.CartItem.bulkCreate(newProductsInCart);
            }
            orderItems = await models.CartItem.findAll({
                where: {
                    CartId: orderValidation.id,
                }, 
            })
        }

        if(!orderItems) {
            orderItems = []
        }

        if(orderItems.length === 0 && localCart?.length > 0) {
            cartProductsIdArray = localCart.map(p => p.id)
            const orderItemsArrayData = localCart.map(p => {
                return {
                    ProductId: p.id,
                    CartId: orderValidation.id,
                    quantity: p.quantity,
                    subtotal: ((p.quantity * p.price).toFixed(2)),
                    createdAt: new Date(),
                    updatedAt: new Date() 
                }
            })
            orderItems = await models.CartItem.bulkCreate(orderItemsArrayData);
        }

        let cart = false

        if(orderItems) {
            orderValidation.total = orderItems.reduce((acc, oi) => acc + Number(oi.subtotal), 0)
            await orderValidation.save()
            const cartData = await models.Product.findAll({ 
                where: {id: cartProductsIdArray},
                include: [{
                    model: models.Cart,
                    where: { id: user2FA.id }
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

        const jasonWebToken = jwt.sign({id: user2FA.id, username: user2FA.username}, SECRET_KEY_JWT)


        return response.success(req, res, {message: 'Successful log in', token: jasonWebToken, cart})

    } catch (error) {
        response.error(req, res, error)
    }
    
})


module.exports = signInRouter